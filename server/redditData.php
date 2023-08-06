<?php

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // vars to get access token
    $url ='https://ssl.reddit.com/api/v1/access_token';
    $clientId = '47zA-WTJ_kOjO3xsUm4HOA';
    $clientSecret = 'G2__IO2E8qYbtXJ27PWfRfkAfUTdgA';

    // post variables
    $fields = array (
        'grant_type' => 'client_credentials'
    );

    $userAgent = 'sometext:testApp v0.1 by andreslopez';

    // prepare data for post
    $field_string = http_build_query($fields);

    $curl = curl_init($url);
    curl_setopt($curl, CURLOPT_HTTPHEADER, array('Authorization: Basic ' . base64_encode($clientId . ':' . $clientSecret) ));
    curl_setopt($curl,CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($curl,CURLOPT_USERAGENT, $userAgent);
    curl_setopt($curl,CURLOPT_POST, 1);
    curl_setopt($curl,CURLOPT_POSTFIELDS, $field_string);

    $response = curl_exec($curl);
    $err = curl_error($curl);
    curl_close($curl);

    $response = json_decode($response, true);
    // now get the data
    $curl = curl_init('https://oauth.reddit.com/reddits.json');
    curl_setopt( $curl, CURLOPT_HTTPHEADER, array('Authorization: bearer ' . $response['access_token'] ) );
    curl_setopt($curl,CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($curl,CURLOPT_USERAGENT, $userAgent);

    $response = curl_exec($curl);
    $err = curl_error($curl);
    curl_close($curl);

    $response = json_decode($response, true);
    echo json_encode($response);
}



