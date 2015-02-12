using UnityEngine;
using System.Collections;

public class touch_of_goal : MonoBehaviour {
		public syncer websocket;
		// Use this for initialization
		void Start () {
				websocket = GameObject.Find("Network").GetComponent<syncer> ();
		}

		void OnTriggerEnter(Collider other){
//				Debug.Log (other.transform.name);
				if (other.transform.name=="Player") {
						Application.LoadLevel ("clear");
						websocket.wss.Send("{\"type\" : \"gamestop\"}");
				}

		}
}
