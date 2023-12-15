import Plane from '@/types/Plane'
import { planeConverter } from '@/types/Plane'
import { getDocs, collection } from 'firebase/firestore'
import { db } from '@/plugins/firesbaseConfig'



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

  public static setPlaneSchrott(id: string): Promise<void | Plane> {
    return new Promise((resolve, reject) => {
      return Plane.createEmptyPlane(); // muss noch ausformuliert werden
    });
  }

  public static saveNewPlane(plane: Plane): Promise<void | Plane> {
    return new Promise((resolve, reject) => {
      return Plane.createEmptyPlane(); // muss noch ausformuliert werden
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

  static updatePlane(id: string, plane: Plane): Promise<Plane> {
    return new Promise((resolve, reject) => {
      return Plane.createEmptyPlane(); // muss noch ausformuliert werden
    });
  }

  static async createPlaneCollectionBackup(): Promise<void> {}
}