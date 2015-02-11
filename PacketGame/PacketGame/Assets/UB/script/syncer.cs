using UnityEngine;
using System.Collections;
using WebSocketSharp;
using LitJson;

public class syncer : MonoBehaviour
{
		// Use this for initialization
		public GameObject player;
		public GameObject block_prefab;
		public GameObject goal_prefab;
		private GameObject goal;
		public GameObject blocks;
		public GameObject blockparent;
		private Queue messageQueue;
		public WebSocket wss;
		public string ipAddress;
		private int num;
		private byte[] test = new byte[1];

		void Awake ()
		{
				messageQueue = Queue.Synchronized (new Queue ());
				wss = new WebSocket ("ws://"+ ipAddress +":3001/");
				wss.OnOpen += (o, e) => {
						Debug.Log ("Open");
				};
				wss.OnMessage += (o, s) => {
						string e = s.Data;
//			LitJson.JsonData jsonData =  LitJson.JsonMapper.ToObject(e);
						//Vector3 pos = ToVector3 (jsonData["position"]);
						messageQueue.Enqueue (e);
				};
				wss.Connect ();
		}

		void Start ()
		{
				num = Random.Range (0, 20);
		}

		int block_num = 0;

		void Update ()
		{
				lock (messageQueue.SyncRoot) {
						if (messageQueue.Count > 0) {
								var message = messageQueue.Dequeue ();
//								Debug.Log (message);
								LitJson.JsonData jsonData = LitJson.JsonMapper.ToObject (message.ToString ());
//								Debug.Log ((string)jsonData ["type"]);
								string type = (string)jsonData ["type"];
//								Debug.Log (type);

								if (type == "generate") {
										string position_x = (string)jsonData ["coordinate_x"];
										string position_z = (string)jsonData ["coordinate_z"];

										float f_position_x = float.Parse (position_x);
										float f_position_z = float.Parse (position_z);
										int mode = (int)jsonData ["mode"];
										if (mode != 3) {
												blocks = (GameObject)Instantiate (block_prefab, new Vector3 (f_position_z, 5, f_position_x), block_prefab.transform.rotation) as GameObject;
												blocks.transform.name = "block_/x=" + position_x + "/y=" + position_z;
												blocks.transform.parent = blockparent.transform;
										} else {
												goal = (GameObject)Instantiate (block_prefab, new Vector3 (f_position_z, 5, f_position_x), block_prefab.transform.rotation) as GameObject;
												blocks.transform.name = "goal";
										}
										Debug.Log (blocks);
										block_num++;


										Debug.Log ("mode = " + mode);
										if (mode == 2) {
												blocks.renderer.material.color = Color.red;
										}
								} else if (type == "delete") {
										string position_x = (string)jsonData ["coordinate_x"];
										string position_z = (string)jsonData ["coordinate_z"];
										Destroy (GameObject.Find ("block_/x=" + position_x + "/y=" + position_z));
								} else if (type == "gamestart") {
										player.GetComponent<CharacterMotor> ().canControl = true;
								} else if (type == "gamestop") {
										player.GetComponent<CharacterMotor> ().canControl = false;
								}
						}
						string jsonText = "{ \"type\" : \"position\",  \"position\" : \"" + player.transform.position.x + ","+ player.transform.position.z + "\" }";
						wss.Send(jsonText);
//						Debug.Log (jsonText);
				}
		}

		Vector3 ToVector3 (LitJson.JsonData jsonData)
		{
				string data = (string)jsonData;
				data = data.Remove (0, 1);
				int length = data.Length;
				data = data.Remove (length - 1, 1);
		
				string[] array = data.Split (',');
				return new Vector3 (float.Parse (array [0]), float.Parse (array [1]), float.Parse (array [2]));
		}
}
