import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { ref, onUnmounted, computed } from "vue";

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyDM9XVQ9HrVc5cxJoMn-JQros7_IT5wyHU",
  authDomain: "vue-chat-app-efd3b.firebaseapp.com",
  projectId: "vue-chat-app-efd3b",
  storageBucket: "vue-chat-app-efd3b.appspot.com",
  messagingSenderId: "739140918762",
  appId: "1:739140918762:web:1623b4a106f39f0641e693",
  measurementId: "G-92NM158SQQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const firestore = getFirestore(app);

export function useAuth() {
  const user = ref(null);
  const unsubscribe = auth.onAuthStateChanged((_user) => (user.value = _user));
  onUnmounted(unsubscribe);
  const isLogin = computed(() => user.value !== null);

  const signIn = async () => {
    const googleProvider = new GoogleAuthProvider();
    await signInWithPopup(auth, googleProvider);
  };
  const signOutUser = () => signOut(auth);

  return { user, isLogin, signIn, signOutUser };
}

const messagesCollection = collection(firestore, "messages");
const messagesQuery = query(
  messagesCollection,
  orderBy("createdAt", "desc"),
  limit(100)
);

export function useChat() {
  const messages = ref([]);
  const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
    messages.value = snapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .reverse();
  });
  onUnmounted(unsubscribe);

  const { user, isLogin } = useAuth();
  const sendMessage = async (text) => {
    if (!isLogin.value) return;

    const { photoURL, uid, displayName } = user.value;
    await addDoc(messagesCollection, {
      userName: displayName,
      userId: uid,
      userPhotoURL: photoURL,
      text: text,
      createdAt: serverTimestamp(),
    });
  };

  return { messages, sendMessage };
}
