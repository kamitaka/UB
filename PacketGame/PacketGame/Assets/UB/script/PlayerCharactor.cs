using UnityEngine;
using System.Collections;

public class PlayerCharactor : MonoBehaviour {
	private		int			id;

	public void SyncPosition(Vector3 position){
		transform.position = position;
	}
}
