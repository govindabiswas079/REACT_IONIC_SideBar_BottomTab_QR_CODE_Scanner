import { BarcodeScanner } from "@capacitor-community/barcode-scanner"
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
  useIonAlert
} from "@ionic/react"
import { scanOutline, stopCircleOutline } from "ionicons/icons"
import { useEffect, useState } from "react"
import './Page.css';

const Tab2 = () => {
  const [present] = useIonAlert()
  const [err, setErr] = useState()
  const [hideBg, setHideBg] = useState("")

  const startScan = async () => {
    BarcodeScanner.hideBackground() // make background of WebView transparent
    setHideBg("hideBg")

    const result = await BarcodeScanner.startScan() // start scanning and wait for a result
    stopScan()

    // if the result has content
    if (result.hasContent) {
      console.log(result.content)
      alert(result.content)
      present({
        cssClass: 'my-css',
        header: 'Alert',
        message: result.content,
        buttons: [
          'Cancel',
          { text: 'Ok', handler: (d) => console.log('ok pressed') },
        ],
        onDidDismiss: (e) => console.log('did dismiss'),
      })
    }
  }


  const stopScan = () => {
    BarcodeScanner.showBackground()
    BarcodeScanner.stopScan()
    setHideBg("")
  }



  useEffect(() => {
    const checkPermission = async () => {
      try {
        const status = await BarcodeScanner.checkPermission({ force: true })

        if (status.granted) {
          return true
        }

        return false
      } catch (error) {
        setErr(error.message)
        console.log(error.message)
      }
    }

    checkPermission()

    return () => { }
  }, [])

  if (err) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>QRScanner</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonRow>
            <IonText color="danger">{err}</IonText>
          </IonRow>
        </IonContent>
      </IonPage>
    )
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>QRScanner</IonTitle>
          <IonButtons slot="end">
            <IonButton color="danger" hidden={!hideBg} onClick={stopScan}>
              <IonIcon icon={stopCircleOutline} slot="start" />
              Stop Scan
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className={hideBg}>
        <IonButton
          className="start-scan-button"
          hidden={!!hideBg}
          onClick={startScan}
        >
          <IonIcon icon={scanOutline} slot="start" />
          Start Scan
        </IonButton>
        <div hidden={!hideBg} className="scan-box" />
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
