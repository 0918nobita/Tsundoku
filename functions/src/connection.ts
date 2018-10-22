import { User } from "../../shared/entity";
import { getUserBy } from "./user";

export const _checkConnectionFrom = (
  db: FirebaseFirestore.Firestore
) => async (args: { name: string; to: string }) => {
  return (
    (await db
      .collection("connections")
      .where("from", "==", args.name)
      .where("to", "==", args.to)
      .get()).size > 0
  );
};

export const _getUsersConnectedFrom = (
  db: FirebaseFirestore.Firestore
) => async (name: string) => {
  const users: User[] = [];
  const querySnapshot = await db
    .collection("connections")
    .where("from", "==", name)
    .get();
  const names: string[] = [];

  for (const doc of querySnapshot.docs) names.push(doc.data().to);

  for (const name of names) users.concat(await getUserBy("name", db)(name));

  return users;
};
