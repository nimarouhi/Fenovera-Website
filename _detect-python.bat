@echo off
echo Checking Python installations... > C:\Nima\Hessam\Fenovera\Website\_py-detect.txt
where py >> C:\Nima\Hessam\Fenovera\Website\_py-detect.txt 2>&1
echo --- >> C:\Nima\Hessam\Fenovera\Website\_py-detect.txt
where python >> C:\Nima\Hessam\Fenovera\Website\_py-detect.txt 2>&1
echo --- >> C:\Nima\Hessam\Fenovera\Website\_py-detect.txt
where python3 >> C:\Nima\Hessam\Fenovera\Website\_py-detect.txt 2>&1
echo --- >> C:\Nima\Hessam\Fenovera\Website\_py-detect.txt
where node >> C:\Nima\Hessam\Fenovera\Website\_py-detect.txt 2>&1
echo DONE >> C:\Nima\Hessam\Fenovera\Website\_py-detect.txt
