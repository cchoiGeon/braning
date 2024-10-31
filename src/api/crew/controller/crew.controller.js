import Crew from "../../../../model/crew.js";
import User from "../../../../model/user.js";
import bcrypt from 'bcrypt';


export async function createCrew(req, res) {
    try {
        const ownerId = res.locals.userId;
        const { name, description, isPublic, password } = req.body;

        // 필수 필드 확인
        if (!name || !ownerId) {
            return res.status(400).json({ message: '크루 이름과 생성자는 필수입니다.' });
        }

        // 유저가 이미 3개 이상의 크루를 생성했는지 확인
        const user = await User.findById(ownerId);
        if (!user) return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });

        // const userCrewCount = await Crew.countDocuments({ owner: ownerId });
        // if (userCrewCount >= 3) {
        //     return res.status(403).json({ message: '최대 3개의 크루만 생성할 수 있습니다.' });
        // }

        // 비공개 크루일 경우 비밀번호 암호화
        let hashedPassword = null;
        if (!isPublic && password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }

        // 새로운 크루 생성
        const newCrew = new Crew({
            owner: ownerId,
            name,
            description,
            imageUrl: 'default_image_url',
            isPublic,
            password: isPublic ? null : hashedPassword, // 암호화된 비밀번호 저장
            members: [ownerId],
            memberCount: 1,
        });

        await newCrew.save();

        // 생성한 크루를 유저의 크루 리스트에 추가
        user.crews.push(newCrew._id);
        await user.save();

        return res.status(201).json(newCrew);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: '크루 생성 중 오류가 발생했습니다.' });
    }
}


export async function joinCrewWithPassword(req, res) {
  try {
      const userId = res.locals.userId;
      const { crewId, password } = req.body;

      // 필수 필드 확인
      if (!crewId || !password) {
          return res.status(400).json({ message: '크루 ID와 비밀번호가 필요합니다.' });
      }

      // 크루 찾기
      const crew = await Crew.findById(crewId);
      if (!crew) return res.status(404).json({ message: '크루를 찾을 수 없습니다.' });

      // 크루 인원 수가 30명을 초과하는지 확인
      if (crew.memberCount >= crew.maxMembers) {
          return res.status(403).json({ message: '이 크루는 최대 인원에 도달했습니다.' });
      }

      // 비밀번호 확인 (비밀번호가 해시된 경우 bcrypt 사용)
      const isPasswordValid = crew.isPublic || (await bcrypt.compare(password, crew.password));
      if (!isPasswordValid) {
          return res.status(403).json({ message: '비밀번호가 일치하지 않습니다.' });
      }

      // 이미 멤버인지 확인
      if (crew.members.includes(userId)) {
          return res.status(400).json({ message: '이미 이 크루의 멤버입니다.' });
      }

      // 크루에 멤버 추가 및 유저 크루 리스트 업데이트
      crew.members.push(userId);
      crew.memberCount += 1; // 멤버 수 증가
      await crew.save();

      const user = await User.findById(userId);
      user.crews.push(crewId);
      await user.save();

      return res.status(200).json({ message: '크루에 성공적으로 가입했습니다.', crew });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: '크루 가입 중 오류가 발생했습니다.' });
  }
}

export async function getUserCrews(req, res) {
  try {
      const userId = res.locals.userId;

      // 사용자가 가입한 크루 목록 가져오기
      const user = await User.findById(userId).populate('crews');
      if (!user) {
          return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
      }

      // 가입한 크루 데이터 반환
      return res.status(200).json(user.crews);
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: '사용자가 가입한 크루 데이터를 가져오는 중 오류가 발생했습니다.' });
  }
}