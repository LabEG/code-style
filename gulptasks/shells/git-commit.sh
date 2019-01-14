#!/bin/bash

echo " === Project === ";
echo "";
echo " --- add --- ";
git add -A;

echo "";
echo " --- commit --- ";
echo -n "Enter comment for commit > ";
read text;
git commit -m "$text";

echo "";
echo " --- status --- ";
git status;

echo "";
echo  " --- Completed --- ";
read;