#!/bin/bash

# cmd=""
# watch=0
hostname="controller-0"

function prepare()
{
mkdir -p ~/testsuite
# For AIO SX only, need update with affinity to controller-0?
cat <<EOF > ~/testsuite/stress-cpu.yaml
apiVersion: v1
kind: Pod
metadata:
  name: stress-ng-cpu
spec:
  containers:
  - name: stress-ng-app
    image: alexeiled/stress-ng
    imagePullPolicy: IfNotPresent
    command: ["/stress-ng"]
    args: ["-c 0 -l 96"]
EOF

}

function start()
{
prepare
kubectl apply -f ~/testsuite/stress-cpu.yaml -n kube-system
}

function stop()
{
kubectl delete -f ~/testsuite/stress-cpu.yaml -n kube-system
}

function status()
{
kubectl -n kube-system get pod stress-ng-cpu -o wide
kubectl -n kube-system describe pod stress-ng-cpu
source /etc/platform/openrc
fm alarm-list
}

function asserted()
{
source /etc/platform/openrc
# fm alarm-list | grep "host=${hostname}" | grep "Platform CPU threshold exceeded"
fm alarm-list | grep "Platform CPU threshold exceeded"
}

function usage()
{
echo "usage: stress-cpu-test.sh [start|stop|status|asserted]"
}

while [ "$1" != "" ]; do
    case $1 in
        start )         start
                        exit
                        ;;
        stop )          stop
                        exit
                        ;;
        status )        status
                        exit
                        ;;
        asserted )      asserted
                        exit
                        ;;
        -h | --help )   usage
                        exit
                        ;;
        * )             usage
                        exit 1
    esac
    shift
done
