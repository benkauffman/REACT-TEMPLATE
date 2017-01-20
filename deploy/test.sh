#!/bin/bash
  cd ../

  #exit the script if any errors occur
  set -e

  name=__REACT_TEMPLATE__-test
  host=$name.developmentnow.net
  email=ben.kauffman@developmentnow.com

  # DEPLOY TEST CONTAINER
  # Build image for test environment
  docker build --no-cache=true -t $name --file Dockerfile .

  # Kill and delete the current docker container
  set +e
  docker rm -f $name
  set -e

  docker run -d \
  --name $name \
  -P \
  -e "VIRTUAL_HOST=$host" \
  -e "LETSENCRYPT_HOST=$host" \
  -e "LETSENCRYPT_EMAIL=$email" \
  --restart always \
  $name


  echo waiting 30 seconds before a healthcheck is performed on the container...
  sleep 30s

  set +e
  echo CLEAN UP ALL THE DANGLING DOCKER IMAGES
  docker rmi $(docker images -q -f dangling=true)
  set -e

  # curl and get status code to make sure it's good
  status=$(curl -s -o /dev/null -w "%{http_code}\n" https://$host)

  if [ $status = "200" || $status = "401" ] ; then
     echo STATUS CODE $status = SUCCESSFUL HEALTCHECK!
     exit 0
  else
    if [ $status = "502" ] ; then
      echo waiting another 60 seconds because the container might be taking a little longer...
      sleep 60s
      if [ $status = "200" || $status = "401" ] ; then
        echo STATUS CODE $status = SUCCESSFUL HEALTCHECK!
        exit 0
      fi
    fi
     echo HEALTCHECK FAILED! STATUS CODE $status
     exit 1
  fi
