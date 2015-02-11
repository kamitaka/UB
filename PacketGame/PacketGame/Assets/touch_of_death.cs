using UnityEngine;
using System.Collections;

public class touch_of_death : MonoBehaviour {
	public syncer websocket;
	// Use this for initialization
	void Start () {
				websocket = GameObject.Find("Network").GetComponent<syncer> ();
	}
	
	// Update is called once per frame
	void Update () {
	
	}
		void OnTriggerEnter(Collider other){
				Debug.Log (other.transform.name);
				if (other.transform.name=="Player") {
						Application.LoadLevel ("death");
						websocket.wss.Send("{\"type\" : \"gamestop\"}");
				}

		}
}
