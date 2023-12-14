import type Plane from '@/types/Plane'
import { planeConverter } from '@/types/Plane'
import { getDocs, collection } from 'firebase/firestore'
import { db } from '@/plugins/firesbaseConfig'



interface ImageItem {
  name: string;
  url: string;
}
export default class HangarService {
  public static async getAllPlanes(orderby: string | undefined): Promise<Plane[]> {
    const planesList: Array<Plane> = [];
    console.log("HangarService.getAllPlanes", db);
    const snap = await getDocs(
      collection(db,"planes").withConverter(planeConverter)
    );
    snap.forEach((doc) => {
      if (doc.exists()) {
        planesList.push(doc.data() as Plane);
      }
    });
    return planesList;
  }
}