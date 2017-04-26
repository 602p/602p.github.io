#!/bin/bash

rm -rf os
cd ~/Documents/orth/os/kernel
rm -rf docs
mkdir docs
pwd
python3 ../../docs/make_highlighted.py kernel.ort do_import_resolution
mv docs ~/Documents/602p.github.io/orth/os
cd ~/Documents/602p.github.io/orth
cp ~/Documents/orth/docs/syntax.css os