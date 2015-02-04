using UnityEngine;
using System.Collections;

public class Jtest : MonoBehaviour
{
	//必須ではないらしい
	//[System.Serializable]
	private class DecodeData
	{
		public string message;
		public int num;
		public double dummy;
	}
	
	// Use this for initialization
	void Start () {
		//仮のJSONテキスト.
		string jsonText = "{ \"position\" : \""+transform.position+"\" }";
		Debug.Log (jsonText);

		//JSONテキストのデコード.
		LitJson.JsonData jsonData =  LitJson.JsonMapper.ToObject(jsonText);
		//データの取得
		Vector3 pos = ToVector32 (jsonData["position"]);
		Debug.Log (pos);

	}

	Vector3 ToVector3(LitJson.JsonData jsonData){
		float[] coordinate = new float[3];
		for(int i=0;i<jsonData.Count;i++){
			coordinate[i] = (float)(int)jsonData[i];

		}
		return new Vector3 (coordinate[0], coordinate[1], coordinate[2]);
	}

	Vector3 ToVector32(LitJson.JsonData jsonData){
		string data = (string)jsonData;
		data = data.Remove (0,1);
		int length = data.Length;
		data = data.Remove (length-1, 1);

		string[] array = data.Split(',');
		//float[] coordinate = new float[3];
		return new Vector3(float.Parse(array[0]), float.Parse(array[1]), float.Parse(array[2]));
	}
}