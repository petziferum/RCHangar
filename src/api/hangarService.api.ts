import Plane from '@/types/Plane'
import { planeConverter } from '@/types/Plane'
import { getDocs, updateDoc, doc, setDoc, collection } from 'firebase/firestore'
import { ref, listAll, getDownloadURL,  ref as fireRef,  uploadBytes, getStorage} from "firebase/storage";
import { COLLECTION_NAME, db } from '@/plugins/firesbaseConfig'
import { toast } from 'vue3-toastify'
import LogEntry from '@/types/LogEntry'

const IMAGE_FOLDER = "planes";
const storage = getStorage();

interface ImageItem {
  name: string;
  url: string;
}
export default class HangarService {
  public static async getAllPlanes(): Promise<Plane[]> {
    const planesList: Array<Plane> = [];
    const snap = await getDocs(
      collection(db,"planes").withConverter(planeConverter)
    );
    console.log("snap", snap);
    snap.forEach((doc) => {
        planesList.push(doc.data() as Plane);
    });
    return planesList;
  }

  public static async getPlaneById(id: string): Promise<Plane> {
    return new Promise((resolve, reject) => {
      return Plane.createEmptyPlane(); // muss noch ausformuliert werden
    });
  }

  public static setPlaneSchrott(id: string): Promise<Plane> {
    return new Promise((resolve, reject) => {
      return Plane.createEmptyPlane(); // muss noch ausformuliert werden
    });
  }

  public static async saveNewPlane(plane: Plane): Promise<Plane> {
    console.log(" speichere mit id: ", plane.id);
    toast("Speichere Flugzeug", { type: "info" });
    let id = "";
    if (plane.id) {
      id = plane.id;
    } else return Plane.createEmptyPlane().withId("Error: keine ID!");

    const ref = doc(db, COLLECTION_NAME, id).withConverter(planeConverter);
    return await setDoc(ref, plane).then(() => {
      return plane;
    });
  }

  public static async uploadImage(file: any): Promise<string | undefined> {
    const folder = IMAGE_FOLDER + "/";
    const storageRef = fireRef(storage, folder + file.name);
    try {
      const snapshot = await uploadBytes(storageRef, file);
      const downloadUrl = await getDownloadURL(snapshot.ref);
      console.log("Uploaded a blob or file!", downloadUrl);
      return downloadUrl;
    } catch (error) {
      console.log("Fehler: ", error);
    }
  }

  public static getAllImages(): Promise<string[]> {
    const recipeRef = ref(storage, IMAGE_FOLDER);
    return listAll(recipeRef)
      .then((res) => {
        const urlPromises = res.items.map((itemRef) => getDownloadURL(itemRef));
        return Promise.all(urlPromises);
      })
      .catch((error) => {
        console.log("error", error);
        return [];
      });
  }

  public static updatePlaneDescription(id: string, beschreibung: string): void {
    console.log("updatePlaneDescription wird noch ergänzt");
  }

  static async updatePlane(plane: Plane): Promise<Plane> {
    console.log("update Plane: ", plane);
    if (!plane.id) {
      throw new Error("Plane ID is required for updating.");
    }
    const planeRef = doc(db, "planes", plane.id).withConverter(planeConverter);
    const planeData = planeConverter.toFirestore(plane);
    return updateDoc(planeRef, planeData).then(() => plane);
  }

  static async createPlaneCollectionBackup(): Promise<void> {}
}