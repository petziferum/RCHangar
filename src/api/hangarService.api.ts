import Plane from '@/types/Plane'
import { planeConverter } from '@/types/Plane'
import { getDocs, doc, setDoc, collection } from 'firebase/firestore'
import { COLLECTION_NAME, db } from '@/plugins/firesbaseConfig'
import { toast } from 'vue3-toastify'



interface ImageItem {
  name: string;
  url: string;
}
export default class HangarService {
  public static async getAllPlanes(): Promise<Plane[]> {
    const planesList: Array<Plane> = [];
    console.log("HangarService.getAllPlanes");
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

  public static uploadPlaneImages(): void {
    console.log("uploadPlaneImages wird noch ergänzt");
  }

  public static getPlaneImages(): Promise<ImageItem[]> {
    return new Promise((resolve, reject) => {
      return []; // muss noch ausformuliert werden
    });
  }

  public static updatePlaneDescription(id: string, beschreibung: string): void {
    console.log("updatePlaneDescription wird noch ergänzt");
  }

  static async updatePlane(plane: Plane): Promise<Plane> {
    const planeRef = doc(db, COLLECTION_NAME, plane.id).withConverter(planeConverter);
    return await setDoc(planeRef, plane).then(() => plane);
  }

  static async createPlaneCollectionBackup(): Promise<void> {}
}