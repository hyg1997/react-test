import { auth } from "./config";

export const doSignOut = () => auth.signOut();

export { default as firebaseAuthenticationError } from "./firebaseAuthenticationError";
