package be.howest.nmct.android;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.SharedPreferences;
import android.os.AsyncTask;
import android.service.notification.NotificationListenerService;
import android.service.notification.StatusBarNotification;
import android.util.Log;

import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;

import java.net.URI;

public class NLService extends NotificationListenerService {

    private String TAG = this.getClass().getSimpleName();
    private NLServiceReceiver nlservicereciver;

    private static boolean isTwitter;
    private static boolean isFacebook;
    private static boolean isInstagram;
    private static boolean isGmail;
    private static boolean isSMS;
    private static boolean isCall;
    private static boolean isPushbullet;
    // shared prefs
    SharedPreferences sharedpreferences;

    @Override
    public void onCreate() {
        super.onCreate();

        sharedpreferences = getSharedPreferences(MainActivity.MyPREFERENCES, Context.MODE_PRIVATE);

        if (sharedpreferences.contains(MainActivity.Twitter))
        {
            isTwitter = sharedpreferences.getBoolean(MainActivity.Twitter, true);
        }
        if (sharedpreferences.contains(MainActivity.Facebook))
        {
            isFacebook = sharedpreferences.getBoolean(MainActivity.Facebook, true);
        }
        if (sharedpreferences.contains(MainActivity.Instagram))
        {
            isInstagram = sharedpreferences.getBoolean(MainActivity.Instagram, true);
        }
        if (sharedpreferences.contains(MainActivity.Gmail))
        {
            isGmail = sharedpreferences.getBoolean(MainActivity.Gmail, true);
        }
        if (sharedpreferences.contains(MainActivity.SMS))
        {
            isSMS = sharedpreferences.getBoolean(MainActivity.SMS, true);
        }
        if (sharedpreferences.contains(MainActivity.Call))
        {
            isCall = sharedpreferences.getBoolean(MainActivity.Call, true);
        }
        if (sharedpreferences.contains(MainActivity.Pushbullet))
        {
            isPushbullet = sharedpreferences.getBoolean(MainActivity.Pushbullet, true);
        }


        nlservicereciver = new NLServiceReceiver();
        IntentFilter filter = new IntentFilter();
        filter.addAction("be.howest.nmct.android.NOTIFICATION_LISTENER_SERVICE_EXAMPLE");
        registerReceiver(nlservicereciver,filter);
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        unregisterReceiver(nlservicereciver);
    }

    @Override
    public void onNotificationPosted(StatusBarNotification sbn) {

        if(sbn.getPackageName().equals("com.pushbullet.android"))
        {

            new RetrieveFeedTask().execute("jefk");

            Log.i(TAG,"**********  onNotificationPosted");
            Log.i(TAG,"ID :" + sbn.getId() + "t" + sbn.getNotification().tickerText + "\t" + sbn.getPackageName());
            Intent i = new  Intent("be.howest.nmct.android.NOTIFICATION_LISTENER_EXAMPLE");
            i.putExtra("notification_event","tis der ene van pushbuller :" + sbn.getPackageName() + "\n");
            sendBroadcast(i);
        }
        else {
            Log.i(TAG, "**********  onNotificationPosted");
            Log.i(TAG, "ID :" + sbn.getId() + "t" + sbn.getNotification().tickerText + "\t" + sbn.getPackageName());
            Intent i = new Intent("be.howest.nmct.android.NOTIFICATION_LISTENER_EXAMPLE");
            i.putExtra("notification_event", "onNotificationPosted :" + sbn.getPackageName() + "\n");
            sendBroadcast(i);
        }

    }

    @Override
    public void onNotificationRemoved(StatusBarNotification sbn) {
        Log.i(TAG,"********** onNOtificationRemoved");
        Log.i(TAG,"ID :" + sbn.getId() + "t" + sbn.getNotification().tickerText +"\t" + sbn.getPackageName());
        Intent i = new  Intent("be.howest.nmct.android.NOTIFICATION_LISTENER_EXAMPLE");
        i.putExtra("notification_event","onNotificationRemoved :" + sbn.getPackageName() + "\n");

        sendBroadcast(i);
    }

    class NLServiceReceiver extends BroadcastReceiver{

        @Override
        public void onReceive(Context context, Intent intent) {
            if(intent.getStringExtra("command").equals("clearall")){
                NLService.this.cancelAllNotifications();
            }
            else if(intent.getStringExtra("command").equals("list")){
                Intent i1 = new  Intent("be.howest.nmct.android.NOTIFICATION_LISTENER_EXAMPLE");
                i1.putExtra("notification_event","=====================");
                sendBroadcast(i1);
                int i=1;
                for (StatusBarNotification sbn : NLService.this.getActiveNotifications()) {
                    Intent i2 = new  Intent("be.howest.nmct.android.NOTIFICATION_LISTENER_EXAMPLE");
                    i2.putExtra("notification_event",i +" " + sbn.getPackageName());
                    sendBroadcast(i2);
                    i++;
                }
                Intent i3 = new  Intent("be.howest.nmct.android.NOTIFICATION_LISTENER_EXAMPLE");
                i3.putExtra("notification_event","===== Notification List ====");
                sendBroadcast(i3);

            }

        }
    }

    class RetrieveFeedTask extends AsyncTask<String, Void, String> {

        private Exception exception;

        protected String doInBackground(String... urls) {
            try {
                HttpClient client = new DefaultHttpClient();
                HttpGet request = new HttpGet();
                URI website = new URI("http://192.168.2.205:8080/api/values");
                request.setURI(website);
                HttpResponse response = client.execute(request);
                return "Yoran";
            } catch (Exception e) {
                this.exception = e;
                return "jefke;";
            }
        }

        protected void onPostExecute(String feed) {
            // TODO: check this.exception
            // TODO: do something with the feed
        }
    }

}