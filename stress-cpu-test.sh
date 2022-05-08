#!/bin/bash

#hostname="controller-0"

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
    export KUBECONFIG="/etc/kubernetes/admin.conf"
    kubectl -n kube-system get pod stress-ng-cpu
    if [ "$?" == 1 ]; then
        prepare
        kubectl apply -f ~/testsuite/stress-cpu.yaml -n kube-system
        if [ "$?" == 0 ]; then
            # sleep for 5 minutes
            # sleep 5m
            echo "status:pass"
        else
            echo "status:fail"
        fi
    else
        echo "status:pass"
    fi
}

function stop()
{
    export KUBECONFIG="/etc/kubernetes/admin.conf"
    kubectl -n kube-system get pod stress-ng-cpu
    if [ "$?" == 0 ]; then
        kubectl delete -f ~/testsuite/stress-cpu.yaml -n kube-system
        if [ "$?" == 0 ]; then
            echo "status:pass"
        else
            echo "status:fail"
        fi
    else
        echo "status:pass"
    fi
}

function started()
{
    export KUBECONFIG="/etc/kubernetes/admin.conf"
    kubectl -n kube-system get pod stress-ng-cpu
    if [ "$?" == 0 ]; then
        echo "status:pass"
    else
        echo "status:fail"
    fi
}

function stopped()
{
    export KUBECONFIG="/etc/kubernetes/admin.conf"
    kubectl -n kube-system get pod stress-ng-cpu
    if [ "$?" == 1 ]; then
        echo "status:pass"
    else
        echo "status:fail"
    fi
}

function status()
{
    export KUBECONFIG="/etc/kubernetes/admin.conf"
    kubectl -n kube-system get pod stress-ng-cpu
    if [ "$?" == 0 ]; then
        kubectl -n kube-system get pod stress-ng-cpu -o wide
        # kubectl -n kube-system describe pod stress-ng-cpu
        source /etc/platform/openrc
        fm alarm-list
        # echo "status:pass"
    # else
        # echo "status:fail"
    fi
}

function asserted()
{
    export KUBECONFIG="/etc/kubernetes/admin.conf"
    kubectl -n kube-system get pod stress-ng-cpu
    if [ "$?" == 0 ]; then
        source /etc/platform/openrc
        # fm alarm-list | grep "host=${hostname}" | grep "Platform CPU threshold exceeded"
        # fm alarm-list output format is affected by stty column width, which is 80 by default
        # stty cols 120
        # fm alarm-list | grep "100.101"
        # Note: stty cols will fail in paramiko exec_command() (or pty), just ignore it
        stty cols 80
        fm alarm-list | grep -A 1  ^"| 100." | grep -B 1 ^"| 101"
        if [ "$?" == 0 ]; then
            echo "status:pass"
        else
            echo "status:fail"
        fi
    else
        echo "status:fail"
    fi
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
        started )       started
                        exit
                        ;;
        stopped )       stopped
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
