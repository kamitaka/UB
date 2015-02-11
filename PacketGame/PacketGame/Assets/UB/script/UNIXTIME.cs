using UnityEngine;
using System.Collections;
using System;

public class UNIXTIME : MonoBehaviour{
		public syncer websocket;
	private float m_interval = 1;
	private float m_timer = 0;

	void Start(){
				websocket = GetComponent<syncer> ();
	}

	void Update(){
		m_timer += Time.deltaTime;
		if(m_timer > m_interval){
			m_timer = 0;
			websocket.wss.Send("{\"latency\", \""+getNowUnixTime()+"\"}");
		}
	}

	//UNIXエポック時刻
	public readonly DateTime dtUnixEpoch = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc);
	
	/// <summary>
	/// 現在のUNIX時刻を作成＆リターン
	/// </summary>
	public double getNowUnixTime()
	{
		//現在時刻のDateTimeオブジェクト
		DateTime dt = DateTime.Now;
		//UTC時刻に変更
		dt = dt.ToUniversalTime();
		//現在時刻のDateTimeからUNIXエポック時刻のDateTimeを引いて、その結果を秒数で表す
		return Math.Round ((double)dt.Subtract(dtUnixEpoch).TotalSeconds*1000);
	}
}
