using UnityEngine;
using System.Collections;
using WebSocketSharp;

public class ws : MonoBehaviour {
	// Use this for initialization
	public GameObject player;

	private Queue messageQueue;
	private WebSocket wss;
	private int num;
	private byte[] test = new byte[1];

	void Awake () {
		messageQueue = Queue.Synchronized(new Queue());
		wss = new WebSocket("ws://157.7.65.203:3001/");
		wss.OnOpen += (o, e) => {
			Debug.Log("Open");
		};
		wss.OnMessage += (o, s) => {
			string e = s.Data;
			//JSONテキストのデコード.
			Debug.Log(e);
			//LitJson.JsonData jsonData =  LitJson.JsonMapper.ToObject(e);
			//Vector3 pos = ToVector3 (jsonData["position"]);
			messageQueue.Enqueue (e);
		};
		wss.Connect ();
	}

	void Start(){
		player = GameObject.FindWithTag ("Player");
	}

	void Update(){
		lock (messageQueue.SyncRoot) {
			if (messageQueue.Count > 0) {
				Debug.Log (messageQueue.Dequeue ());
			}
			string jsonText = "{ \"position\" : \""+player.transform.position+"\" }";
			//wss.Send(jsonText);
		}
	}

	Vector3 ToVector3(LitJson.JsonData jsonData){
		string data = (string)jsonData;
		data = data.Remove (0,1);
		int length = data.Length;
		data = data.Remove (length-1, 1);
		
		string[] array = data.Split(',');
		return new Vector3(float.Parse(array[0]), float.Parse(array[1]), float.Parse(array[2]));
	}
}