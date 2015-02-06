using UnityEngine;
using System.Collections;
using WebSocketSharp;
using LitJson;

public class syncer : MonoBehaviour {
	// Use this for initialization
	public GameObject player;
	public GameObject block;
	
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
//			LitJson.JsonData jsonData =  LitJson.JsonMapper.ToObject(e);
			//Vector3 pos = ToVector3 (jsonData["position"]);
			messageQueue.Enqueue (e);
		};
		wss.Connect ();
	}
	
	void Start(){
		num = Random.Range (0, 20);
	}
	
	void Update(){
		lock (messageQueue.SyncRoot) {
			if (messageQueue.Count > 0) {
				var message = messageQueue.Dequeue ();
				Debug.Log (message);
				LitJson.JsonData jsonData =  LitJson.JsonMapper.ToObject(message.ToString());
				string type = (string)jsonData["type"];
				Debug.Log (type);
				string position_x = (string)jsonData["coordinate_x"];
				string position_z = (string)jsonData["coordinate_z"];

				float f_position_x = float.Parse (position_x);
				float f_position_z = float.Parse (position_z);

				Debug.Log (f_position_x);
				if (type == "generate") {
					Instantiate (block,new Vector3(f_position_x,1,f_position_z),block.transform.rotation);
				}
			}
			string jsonText = "{ \"id\" : \"\",  \"position\" : \""+player.transform.position+"\" }";
//			wss.Send(jsonText);
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
