#!/bin/bash

# Replace these three settings.
PROJDIR="/var/django/branchapps"
PIDFILE="$PROJDIR/ba.pid"
SOCKET="$PROJDIR/ba.sock"

cd $PROJDIR
if [ -f $PIDFILE ]; then
    kill `cat -- $PIDFILE`
    rm -f -- $PIDFILE
fi

exec /usr/bin/env - \
  PYTHONPATH="../python:.." \
  ./manage.py runfcgi method=threaded host=127.0.0.1 port=3333 pidfile=$PIDFILE

/etc/init.d/lighttpd restart
