using UnityEngine;
using System.Collections;

public class standby : MonoBehaviour {
		public syncer websocket;
	// Use this for initialization
		public void StundbyButton(){
				websocket = GameObject.Find("Network").GetComponent<syncer> ();
				websocket.wss.Send ("{\"type\" : \"unityready\"}");
		}
	void Start () {

	}
	
	// Update is called once per frame
	void Update () {
		
	}
}
