#!/bin/bash
forever start -a -l ./server.log -o ./server.out -e ./server.err npm run server
