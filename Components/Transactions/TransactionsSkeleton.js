import React from 'react';
import {
  List,
  SkeletonCard,
  SkeletonIcon,
  SkeletonLineWrap,
  SkeletonLine,
  SkeletonAmount,
} from './transactions.styles';

export default function TransactionsSkeleton() {
  return (
    <List>
      {Array.from({ length: 6 }).map((_, index) => (
        <SkeletonCard key={index}>
          <SkeletonIcon />
          <SkeletonLineWrap>
            <SkeletonLine $w="45%" />
            <SkeletonLine $w="65%" />
          </SkeletonLineWrap>
          <SkeletonAmount />
        </SkeletonCard>
      ))}
    </List>
  );
}