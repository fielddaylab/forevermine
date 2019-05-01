#!/bin/bash
n=0
rmd=0
folder=system
mkdir new$folder
mkdir newnew$folder

if [ 1 == 1 ]; then
  for i in $folder/*.png; do
    pre=`echo $i | sed 's/-.*//'`;
    post=`echo $i | sed "s@.*$pre-@@" | sed "s@.png@@"`;
    smallest=$post;
    echo $pre;
    echo $post;
    for j in $pre-*.png; do
      npost=`echo $j | sed "s@.*$pre-@@" | sed "s@.png@@"`;
      echo "- "$npost;
      echo $npost vs $smallest
      if [ $npost -lt $smallest ]; then
        if cmp --silent $i $j; then
          echo "MATCH $i $j ( $rmd / $n )";
          smallest=$npost;
        fi
      fi
    done
    if [ $smallest != $post ]; then
      cp $i new$i.$smallest.png;
      ((rmd++));
    else
      cp $i new$i;
    fi
    ((n++))
  done
fi

for i in new$folder/*.png; do
  if [ -e $i ]; then
    pre=`echo $i | sed 's/-.*//'`;
    frame=0;
    uniqframe=0;
    while [ -e $pre-$frame.png* ]; do
      if [ -e $pre-$frame.png ]; then
        mv $pre-$frame.png new$pre-$uniqframe.png
        list+="$uniqframe,"
        echo $pre-$frame.png
        ((uniqframe++))
      else
        fallback=`echo $pre-$frame.png* | sed 's@[^.]*\.[^.]*\.@@' | sed 's@.png@@'`
        rm $pre-$frame.png*;
        echo $pre-$fallback.png
      fi
      ((frame++))
    done
  fi
done

rm -r $folder
rm -r new$folder
mv newnew$folder $folder

