using UnityEngine;
using System.Collections;

public class controller : MonoBehaviour {

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
		if(Input.GetKey(KeyCode.UpArrow)){
			transform.position += new Vector3(0,0,0.1f);
		}
		if(Input.GetKey(KeyCode.RightArrow)){
			transform.position += new Vector3(0.1f,0,0);
		}
		if(Input.GetKey(KeyCode.DownArrow)){
			transform.position += new Vector3(0,0,-0.1f);
		}
		if(Input.GetKey(KeyCode.LeftArrow)){
			transform.position += new Vector3(-0.1f,0,0);
		}
	}
}
