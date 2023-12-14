import type Plane from '@/types/Plane'
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
}