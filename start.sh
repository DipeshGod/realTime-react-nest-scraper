#!/bin/bash

# start the backend dev server
(cd backend; npm run start:dev) &

# start the backend dev server
(cd frontend; npm run dev )