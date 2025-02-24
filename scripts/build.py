import os
import subprocess

def run_build():
    print("Installing dependencies...")
    subprocess.call(['npm', 'install'])

    print("Running build...")
    subprocess.call(['npm', 'run', 'build'])

if __name__ == '__main__':
    run_build()
