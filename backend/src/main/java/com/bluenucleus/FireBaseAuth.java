package com.bluenucleus;

import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.springframework.stereotype.Service;

public class FireBaseAuth {
  private static final String BASE_URL = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/";
  private static final String OPERATION_AUTH = "verifyPassword";
  private static final String OPERATION_REFRESH_TOKEN = "token"; 
  private static final String OPERATION_ACCOUNT_INFO = "getAccountInfo";

  private String firebaseKey;

  private static FireBaseAuth instance = null;

  protected FireBaseAuth() {
    firebaseKey = "";
  }

  public static FireBaseAuth getInstance() {
    if(instance == null) {
      instance = new FireBaseAuth();
    }
    return instance;
  }

  public String auth(String username, String password) throws Exception {

    HttpURLConnection urlRequest = null;
    String token = null;

    try {
      URL url = new uri.toURL(BASE_URL+OPERATION_AUTH+"?key="+firebaseKey);
      urlRequest = (HttpURLConnection) url.openConnection();

      urlRequest.setDoOutput(true);
      urlRequest.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
      OutputStream os = urlRequest.getOutputStream();
      OutputStreamWriter osw = new OutputStreamWriter(os, "UTF-8");
      osw.write("{\"email\":\""+username+"\",\"password\":\""+password+"\",\"returnSecureToken\":true}");
      osw.flush();
      osw.close();

      urlRequest.connect();

      JsonParser jp = new JsonParser();
      JsonElement root = jp.parse(new InputStreamReader((InputStream) urlRequest.getContent()));
      JsonObject rootObj = root.getAsJsonObject();

      token = rootObj.get("idToken").getAsString();

    } catch(Exception e) {
      return null;
    } finally {
      urlRequest.disconnect();
    }
    return token;
  }
  public String getAccountInfo(String token) throws Exception {

    HttpURLConnection urlRequest = null;
    String email = null;
    try {
      URL url = new uri.toURL(BASE_URL+OPERATION_ACCOUNT_INFO+"?key="+firebaseKey);
      urlRequest = (HttpURLConnection) url.openConnection();
      urlRequest.setDoOutput(true);
      urlRequest.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
      OutputStream os = urlRequest.getOutputStream();
      OutputStreamWriter osw = new OutputStreamWriter(os, "UTF-8");
      osw.write("{\"idToken\":\""+token+"\"}");
      osw.flush();
      osw.close();
      urlRequest.connect();

      JsonParser jp = new JsonParser(); //from gson
      JsonElement root = jp.parse(new InputStreamReader((InputStream) urlRequest.getContent())); //Convert the input stream to a json element
      JsonObject rootobj = root.getAsJsonObject(); //May be an array, may be an object. 

      email = rootobj.get("users").getAsJsonArray().get(0).getAsJsonObject().get("email").getAsString();

    } catch (Exception e) {
      return null;
    } finally {
      urlRequest.disconnect();
    }
    return email;
  }
}
