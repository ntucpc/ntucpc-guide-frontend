import os
import argparse
import shutil

parser = argparse.ArgumentParser()
parser.add_argument("guide")
args = parser.parse_args()
public_root = os.path.join("public", "files")

guide = args.guide
if os.path.exists(public_root):
    shutil.rmtree(public_root)

def build_figure(dir, depth, figure_dir = "figure"):
    if not os.path.exists(dir):
        print(f"Directory {dir} not found")
        return
    if not os.path.isdir(dir):
        print(f"{dir} is not a directory")
        return

    if depth == 0:
        figure_path = os.path.join(dir, figure_dir)
        if not os.path.isdir(figure_path):
            return
        for file in os.listdir(figure_path):
            filepath = os.path.join(figure_path, file)
            public_filepath = os.path.join(public_root, os.path.relpath(filepath, guide))
            public_dir = os.path.dirname(public_filepath)
            os.makedirs(public_dir, exist_ok=True)
            shutil.copy(filepath, public_filepath)
            print("copy file: ", filepath, "->", public_filepath)
        return
    
    for subdir in os.listdir(dir):
        dirpath = os.path.join(dir, subdir)
        if not os.path.isdir(dirpath):
            continue
        build_figure(dirpath, depth - 1, figure_dir)
        
    
build_figure(os.path.join(guide, "content"), 2)
build_figure(os.path.join(guide, "problems"), 2)
build_figure(os.path.join(guide, "contributors"), 0, "photos")