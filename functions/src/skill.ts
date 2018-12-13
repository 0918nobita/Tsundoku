import { Skill } from "../../shared/entity";

export const _createSkill = (db: FirebaseFirestore.Firestore) =>
  async (skill: Skill) => (await db.collection('skill').add(skill)).id;

export const _deleteSkill = (db: FirebaseFirestore.Firestore) =>
  async (id: string) => {
    try {
      await db.collection('skill').doc(id).delete();
      return true;
    } catch {
      return false;
    }
  };
