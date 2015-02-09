using UnityEngine;
using System.Collections;

public class touch_of_death : MonoBehaviour {

	// Use this for initialization
	void Start () {
		
	}
	
	// Update is called once per frame
	void Update () {
	
	}
		void OnTriggerEnter(Collider other){
				Debug.Log (other.transform.name);
				if (other.transform.name=="Player") {
						Application.LoadLevel ("death");
				}
		}
}
