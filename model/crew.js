import mongoose from 'mongoose';
const crewSchema = new mongoose.Schema({
  owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true }, // 크루 생성자
  name: { type: String, required: true, maxlength: 20 }, // 크루 이름
  description: { type: String, maxlength: 200 }, // 크루 설명
  imageUrl: { type: String, default: 'predefined_image_url' }, // 사전 정의된 대표 이미지
  isPublic: { type: Boolean, default: true }, // 공개 여부 (true: 공개, false: 비공개)
  password: { type: String, required: function() { return !this.isPublic; } }, // 비공개일 경우 비밀번호
  maxMembers: { type: Number, default: 30 }, // 최대 멤버 수
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' , index: true }], // 멤버 리스트 (User 참조)
  memberCount: { type: Number, default: 0 } // 현재 크루 멤버 수
});

const Crew = mongoose.model('Crew', crewSchema);
export default Crew;