#!/bin/bash

set -eux
cd /opt/bitnami/app
rm -rf /opt/bitnami/app/*
/opt/bitnami/app -mindepth 1 -delete