import { User } from "../../shared/entity";

export const getUserBy = (
  field: "name" | "uid",
  db: FirebaseFirestore.Firestore
) => async (value: string): Promise<User> => {
  const querySnapshot = await db
    .collection("users")
    .where(field, "==", value)
    .get();
  if (querySnapshot.size === 0) {
    return null;
  } else {
    if (querySnapshot.size > 1)
      console.warn(
        `同一の ${field} を持ったユーザーが複数存在しています (value: ${value})`
      );
    const docData = querySnapshot.docs[0].data();
    return {
      uid: docData.uid,
      bio: docData.bio,
      image: docData.image,
      name: docData.name,
      screenName: docData.screenName
    };
  }
};
