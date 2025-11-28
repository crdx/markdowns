set quiet := true
set shell := ["bash", "-cu", "-o", "pipefail"]

[private]
help:
    just --list --unsorted

deploy:
    npm publish

fmt:
    echo 'Nothing to format'
