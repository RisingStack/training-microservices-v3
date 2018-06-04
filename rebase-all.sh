#!/usr/bin/env bash

BRANCHES=($(git branch --list | grep [[:digit:]] | tr '*' ' ' | sed 's/ //g'))

prev_branch=${BRANCHES[0]}
for branch in ${BRANCHES[@]:1}; do
  git checkout $branch
  git rebase $prev_branch
  prev_branch=$branch
done
