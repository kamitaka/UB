using UnityEngine;
using System.Collections;

public class marioAction : MonoBehaviour {

	// Use this for initialization
	void Start () {
				
	}
	
	// Update is called once per frame
	void Update () {
				if (Input.GetKey (KeyCode.W) || Input.GetKey (KeyCode.A) || Input.GetKey (KeyCode.S) || Input.GetKey (KeyCode.D)) {
						animation.Play ("run");
				} else {
						animation.Play ("idle");
				}
				if (Input.GetKeyDown (KeyCode.A)) {
						transform.Rotate(new Vector3(0, -90, 0));
						Debug.Log ("a");
				}else if(Input.GetKeyUp (KeyCode.A)){
						transform.Rotate(new Vector3(0, 90, 0));
						Debug.Log ("a");
				}
				if (Input.GetKeyDown (KeyCode.D)) {
						transform.Rotate(new Vector3(0, 90, 0));
				}else if(Input.GetKeyUp (KeyCode.D)){
						transform.Rotate(new Vector3(0, -90, 0));
				}
				if (Input.GetKeyDown (KeyCode.S)) {
						transform.Rotate(new Vector3(0, 180, 0));
				}else if(Input.GetKeyUp (KeyCode.S)){
						transform.Rotate(new Vector3(0, 180, 0));
				}
	}
}
