{\rtf1\ansi\ansicpg1252\cocoartf1671\cocoasubrtf500
{\fonttbl\f0\fmodern\fcharset0 Courier;}
{\colortbl;\red255\green255\blue255;\red83\green83\blue83;\red0\green0\blue0;\red238\green242\blue247;
\red187\green196\blue203;}
{\*\expandedcolortbl;;\cssrgb\c40000\c40000\c40000;\cssrgb\c0\c0\c0;\cssrgb\c94510\c96078\c97647;
\cssrgb\c78039\c81176\c83529;}
\margl1440\margr1440\vieww10800\viewh8400\viewkind0
\deftab720

\itap1\trowd \taflags1 \trgaph108\trleft-108 \trcbpat4 \trbrdrt\brdrs\brdrw20\brdrcf5 \trbrdrl\brdrs\brdrw20\brdrcf5 \trbrdrb\brdrs\brdrw20\brdrcf5 \trbrdrr\brdrs\brdrw20\brdrcf5 \tapadb80 
\clvertalc \clshdrawnil \clwWidth22861\clftsWidth3 \clbrdrt\brdrnil \clbrdrl\brdrnil \clbrdrb\brdrnil \clbrdrr\brdrnil \clpadt119 \clpadl119 \clpadb119 \clpadr119 \gaph\cellx8640
\pard\intbl\itap1\pardeftab720\sl270\partightenfactor0

\f0\fs24\fsmilli12275 \cf2 \expnd0\expndtw0\kerning0
\outl0\strokewidth0 \strokec2 #!/bin/sh\
\
clear\
npm run build\
firebase deploy\
git add \'97all -f\
git commit -m \'93terminal\'94\
git push\cell \lastrow\row}