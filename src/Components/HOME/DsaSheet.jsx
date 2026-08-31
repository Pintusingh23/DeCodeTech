import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  ChevronDown, ChevronRight, ChevronLeft, Search, ExternalLink,
  RotateCcw, X, CheckCircle2, BookOpen, BarChart3, Target,
  Trophy, Flame, ArrowUpDown, ChevronsUpDown, Filter
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CONSTANTS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const STORAGE_KEY = "decodetech_dsa_sheet_progress";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// PROBLEM DATASET — 300+ curated DSA problems
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const DSA_ROADMAP = [
  // ──────────────── 1. Learn the Basics ────────────────
  {
    id: "t1",
    topic: "Learn the Basics",
    description: "Build your foundation with basic programming concepts and math",
    subtopics: [
      {
        name: "Basic Math & Logic",
        problems: [
          { id: 1, title: "Count Digits in a Number", difficulty: "Easy", platform: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/problems/count-digits5716/1", pattern: "Math" },
          { id: 2, title: "Reverse a Number", difficulty: "Easy", platform: "LeetCode", url: "https://leetcode.com/problems/reverse-integer/", pattern: "Math" },
          { id: 3, title: "Check Palindrome Number", difficulty: "Easy", platform: "LeetCode", url: "https://leetcode.com/problems/palindrome-number/", pattern: "Math" },
          { id: 4, title: "GCD / HCF of Two Numbers", difficulty: "Easy", platform: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/problems/gcd-of-two-numbers3459/1", pattern: "Math" },
          { id: 5, title: "Armstrong Number", difficulty: "Easy", platform: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/problems/armstrong-numbers2727/1", pattern: "Math" },
          { id: 6, title: "Print All Divisors", difficulty: "Easy", platform: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/problems/sum-of-all-divisors-from-1-to-n4738/1", pattern: "Math" },
          { id: 7, title: "Check for Prime", difficulty: "Easy", platform: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/problems/prime-number2314/1", pattern: "Math" },
        ]
      },
      {
        name: "Recursion Basics",
        problems: [
          { id: 8, title: "Print 1 to N Using Recursion", difficulty: "Easy", platform: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/problems/print-1-to-n-without-using-loops-1587115620/1", pattern: "Recursion" },
          { id: 9, title: "Sum of First N Numbers", difficulty: "Easy", platform: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/problems/sum-of-first-n-terms5843/1", pattern: "Recursion" },
          { id: 10, title: "Factorial of N", difficulty: "Easy", platform: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/problems/factorial5739/1", pattern: "Recursion" },
          { id: 11, title: "Fibonacci Number", difficulty: "Easy", platform: "LeetCode", url: "https://leetcode.com/problems/fibonacci-number/", pattern: "Recursion" },
        ]
      },
      {
        name: "Basic Hashing",
        problems: [
          { id: 12, title: "Frequency of Most Frequent Element", difficulty: "Easy", platform: "LeetCode", url: "https://leetcode.com/problems/frequency-of-the-most-frequent-element/", pattern: "Hashing" },
          { id: 13, title: "Find Highest / Lowest Frequency Element", difficulty: "Easy", platform: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/problems/frequency-of-array-elements-1587115620/1", pattern: "Hashing" },
        ]
      }
    ]
  },

  // ──────────────── 2. Sorting Techniques ────────────────
  {
    id: "t2",
    topic: "Sorting Techniques",
    description: "Master all fundamental sorting algorithms",
    subtopics: [
      {
        name: "Comparison Based Sorts",
        problems: [
          { id: 14, title: "Bubble Sort", difficulty: "Easy", platform: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/problems/bubble-sort/1", pattern: "Sorting" },
          { id: 15, title: "Selection Sort", difficulty: "Easy", platform: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/problems/selection-sort/1", pattern: "Sorting" },
          { id: 16, title: "Insertion Sort", difficulty: "Easy", platform: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/problems/insertion-sort/1", pattern: "Sorting" },
          { id: 17, title: "Merge Sort", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/sort-an-array/", pattern: "Divide & Conquer" },
          { id: 18, title: "Quick Sort", difficulty: "Medium", platform: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/problems/quick-sort/1", pattern: "Divide & Conquer" },
        ]
      },
      {
        name: "Non-Comparison Sorts & Practice",
        problems: [
          { id: 19, title: "Counting Sort", difficulty: "Easy", platform: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/problems/counting-sort/1", pattern: "Sorting" },
          { id: 20, title: "Sort Colors (Dutch National Flag)", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/sort-colors/", pattern: "Sorting" },
          { id: 21, title: "Merge Two Sorted Arrays", difficulty: "Easy", platform: "LeetCode", url: "https://leetcode.com/problems/merge-sorted-array/", pattern: "Sorting" },
        ]
      }
    ]
  },

  // ──────────────── 3. Arrays ────────────────
  {
    id: "t3",
    topic: "Arrays",
    description: "Core array problems from easy to hard, covering all key patterns",
    subtopics: [
      {
        name: "Easy Array Problems",
        problems: [
          { id: 22, title: "Two Sum", difficulty: "Easy", platform: "LeetCode", url: "https://leetcode.com/problems/two-sum/", pattern: "Hashing" },
          { id: 23, title: "Best Time to Buy and Sell Stock", difficulty: "Easy", platform: "LeetCode", url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/", pattern: "Greedy" },
          { id: 24, title: "Contains Duplicate", difficulty: "Easy", platform: "LeetCode", url: "https://leetcode.com/problems/contains-duplicate/", pattern: "Hashing" },
          { id: 25, title: "Maximum Subarray (Kadane's)", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/maximum-subarray/", pattern: "Kadane's Algorithm" },
          { id: 26, title: "Move Zeroes", difficulty: "Easy", platform: "LeetCode", url: "https://leetcode.com/problems/move-zeroes/", pattern: "Two Pointer" },
          { id: 27, title: "Remove Duplicates from Sorted Array", difficulty: "Easy", platform: "LeetCode", url: "https://leetcode.com/problems/remove-duplicates-from-sorted-array/", pattern: "Two Pointer" },
          { id: 28, title: "Single Number", difficulty: "Easy", platform: "LeetCode", url: "https://leetcode.com/problems/single-number/", pattern: "Bit Manipulation" },
          { id: 29, title: "Missing Number", difficulty: "Easy", platform: "LeetCode", url: "https://leetcode.com/problems/missing-number/", pattern: "Math" },
          { id: 30, title: "Majority Element", difficulty: "Easy", platform: "LeetCode", url: "https://leetcode.com/problems/majority-element/", pattern: "Boyer-Moore Voting" },
          { id: 31, title: "Plus One", difficulty: "Easy", platform: "LeetCode", url: "https://leetcode.com/problems/plus-one/", pattern: "Array" },
        ]
      },
      {
        name: "Medium Array Problems",
        problems: [
          { id: 32, title: "3Sum", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/3sum/", pattern: "Two Pointer" },
          { id: 33, title: "Container With Most Water", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/container-with-most-water/", pattern: "Two Pointer" },
          { id: 34, title: "Product of Array Except Self", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/product-of-array-except-self/", pattern: "Prefix Sum" },
          { id: 35, title: "Rotate Array", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/rotate-array/", pattern: "Array" },
          { id: 36, title: "Set Matrix Zeroes", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/set-matrix-zeroes/", pattern: "Matrix" },
          { id: 37, title: "Spiral Matrix", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/spiral-matrix/", pattern: "Matrix" },
          { id: 38, title: "Next Permutation", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/next-permutation/", pattern: "Array" },
          { id: 39, title: "Subarray Sum Equals K", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/subarray-sum-equals-k/", pattern: "Prefix Sum + Hashing" },
          { id: 40, title: "Maximum Product Subarray", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/maximum-product-subarray/", pattern: "Dynamic Programming" },
          { id: 41, title: "Merge Intervals", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/merge-intervals/", pattern: "Sorting + Intervals" },
        ]
      },
      {
        name: "Hard Array Problems",
        problems: [
          { id: 42, title: "Trapping Rain Water", difficulty: "Hard", platform: "LeetCode", url: "https://leetcode.com/problems/trapping-rain-water/", pattern: "Two Pointer / Stack" },
          { id: 43, title: "First Missing Positive", difficulty: "Hard", platform: "LeetCode", url: "https://leetcode.com/problems/first-missing-positive/", pattern: "Cyclic Sort" },
          { id: 44, title: "4Sum", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/4sum/", pattern: "Two Pointer" },
          { id: 45, title: "Majority Element II", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/majority-element-ii/", pattern: "Boyer-Moore Voting" },
          { id: 46, title: "Pascal's Triangle", difficulty: "Easy", platform: "LeetCode", url: "https://leetcode.com/problems/pascals-triangle/", pattern: "Array" },
        ]
      }
    ]
  },

  // ──────────────── 4. Binary Search ────────────────
  {
    id: "t4",
    topic: "Binary Search",
    description: "Master binary search patterns on arrays and answer-based problems",
    subtopics: [
      {
        name: "Binary Search on 1D Arrays",
        problems: [
          { id: 47, title: "Binary Search", difficulty: "Easy", platform: "LeetCode", url: "https://leetcode.com/problems/binary-search/", pattern: "Binary Search" },
          { id: 48, title: "Search Insert Position", difficulty: "Easy", platform: "LeetCode", url: "https://leetcode.com/problems/search-insert-position/", pattern: "Binary Search" },
          { id: 49, title: "Find First and Last Position", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/", pattern: "Binary Search" },
          { id: 50, title: "Search in Rotated Sorted Array", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/search-in-rotated-sorted-array/", pattern: "Binary Search" },
          { id: 51, title: "Find Minimum in Rotated Sorted Array", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/", pattern: "Binary Search" },
          { id: 52, title: "Single Element in a Sorted Array", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/single-element-in-a-sorted-array/", pattern: "Binary Search" },
          { id: 53, title: "Peak Element", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/find-peak-element/", pattern: "Binary Search" },
          { id: 54, title: "Sqrt(x)", difficulty: "Easy", platform: "LeetCode", url: "https://leetcode.com/problems/sqrtx/", pattern: "Binary Search" },
        ]
      },
      {
        name: "Binary Search on Answers",
        problems: [
          { id: 55, title: "Koko Eating Bananas", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/koko-eating-bananas/", pattern: "Binary Search on Answer" },
          { id: 56, title: "Capacity To Ship Packages", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/", pattern: "Binary Search on Answer" },
          { id: 57, title: "Aggressive Cows", difficulty: "Hard", platform: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/problems/aggressive-cows/1", pattern: "Binary Search on Answer" },
          { id: 58, title: "Allocate Minimum Pages", difficulty: "Hard", platform: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/problems/allocate-minimum-number-of-pages0937/1", pattern: "Binary Search on Answer" },
          { id: 59, title: "Split Array Largest Sum", difficulty: "Hard", platform: "LeetCode", url: "https://leetcode.com/problems/split-array-largest-sum/", pattern: "Binary Search on Answer" },
          { id: 60, title: "Search a 2D Matrix", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/search-a-2d-matrix/", pattern: "Binary Search" },
          { id: 61, title: "Search a 2D Matrix II", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/search-a-2d-matrix-ii/", pattern: "Binary Search" },
          { id: 62, title: "Median of Two Sorted Arrays", difficulty: "Hard", platform: "LeetCode", url: "https://leetcode.com/problems/median-of-two-sorted-arrays/", pattern: "Binary Search" },
          { id: 63, title: "Kth Element of Two Sorted Arrays", difficulty: "Hard", platform: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/problems/k-th-element-of-two-sorted-array1317/1", pattern: "Binary Search" },
        ]
      }
    ]
  },

  // ──────────────── 5. Strings ────────────────
  {
    id: "t5",
    topic: "Strings",
    description: "String manipulation, pattern matching, and classic string algorithms",
    subtopics: [
      {
        name: "Basic String Problems",
        problems: [
          { id: 64, title: "Reverse String", difficulty: "Easy", platform: "LeetCode", url: "https://leetcode.com/problems/reverse-string/", pattern: "Two Pointer" },
          { id: 65, title: "Valid Palindrome", difficulty: "Easy", platform: "LeetCode", url: "https://leetcode.com/problems/valid-palindrome/", pattern: "Two Pointer" },
          { id: 66, title: "Valid Anagram", difficulty: "Easy", platform: "LeetCode", url: "https://leetcode.com/problems/valid-anagram/", pattern: "Hashing" },
          { id: 67, title: "First Unique Character in a String", difficulty: "Easy", platform: "LeetCode", url: "https://leetcode.com/problems/first-unique-character-in-a-string/", pattern: "Hashing" },
          { id: 68, title: "Longest Common Prefix", difficulty: "Easy", platform: "LeetCode", url: "https://leetcode.com/problems/longest-common-prefix/", pattern: "String" },
          { id: 69, title: "Roman to Integer", difficulty: "Easy", platform: "LeetCode", url: "https://leetcode.com/problems/roman-to-integer/", pattern: "String" },
          { id: 70, title: "Isomorphic Strings", difficulty: "Easy", platform: "LeetCode", url: "https://leetcode.com/problems/isomorphic-strings/", pattern: "Hashing" },
        ]
      },
      {
        name: "Medium String Problems",
        problems: [
          { id: 71, title: "Longest Substring Without Repeating Characters", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/", pattern: "Sliding Window" },
          { id: 72, title: "Group Anagrams", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/group-anagrams/", pattern: "Hashing + Sorting" },
          { id: 73, title: "Longest Palindromic Substring", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/longest-palindromic-substring/", pattern: "Expand Around Center" },
          { id: 74, title: "String to Integer (atoi)", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/string-to-integer-atoi/", pattern: "String Parsing" },
          { id: 75, title: "Count and Say", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/count-and-say/", pattern: "String" },
          { id: 76, title: "Multiply Strings", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/multiply-strings/", pattern: "Math + String" },
        ]
      },
      {
        name: "Hard String / Pattern Matching",
        problems: [
          { id: 77, title: "Minimum Window Substring", difficulty: "Hard", platform: "LeetCode", url: "https://leetcode.com/problems/minimum-window-substring/", pattern: "Sliding Window" },
          { id: 78, title: "Repeated String Match", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/repeated-string-match/", pattern: "String Matching" },
          { id: 79, title: "Implement strStr (KMP)", difficulty: "Easy", platform: "LeetCode", url: "https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/", pattern: "KMP Algorithm" },
          { id: 80, title: "Shortest Palindrome", difficulty: "Hard", platform: "LeetCode", url: "https://leetcode.com/problems/shortest-palindrome/", pattern: "KMP / Hashing" },
        ]
      }
    ]
  },

  // ──────────────── 6. Linked List ────────────────
  {
    id: "t6",
    topic: "Linked List",
    description: "Master singly and doubly linked list operations and classic problems",
    subtopics: [
      {
        name: "Singly Linked List Basics",
        problems: [
          { id: 81, title: "Reverse Linked List", difficulty: "Easy", platform: "LeetCode", url: "https://leetcode.com/problems/reverse-linked-list/", pattern: "Linked List" },
          { id: 82, title: "Middle of the Linked List", difficulty: "Easy", platform: "LeetCode", url: "https://leetcode.com/problems/middle-of-the-linked-list/", pattern: "Fast/Slow Pointer" },
          { id: 83, title: "Merge Two Sorted Lists", difficulty: "Easy", platform: "LeetCode", url: "https://leetcode.com/problems/merge-two-sorted-lists/", pattern: "Linked List" },
          { id: 84, title: "Remove Duplicates from Sorted List", difficulty: "Easy", platform: "LeetCode", url: "https://leetcode.com/problems/remove-duplicates-from-sorted-list/", pattern: "Linked List" },
          { id: 85, title: "Linked List Cycle", difficulty: "Easy", platform: "LeetCode", url: "https://leetcode.com/problems/linked-list-cycle/", pattern: "Fast/Slow Pointer" },
          { id: 86, title: "Palindrome Linked List", difficulty: "Easy", platform: "LeetCode", url: "https://leetcode.com/problems/palindrome-linked-list/", pattern: "Fast/Slow Pointer" },
          { id: 87, title: "Intersection of Two Linked Lists", difficulty: "Easy", platform: "LeetCode", url: "https://leetcode.com/problems/intersection-of-two-linked-lists/", pattern: "Two Pointer" },
        ]
      },
      {
        name: "Medium / Hard Linked List",
        problems: [
          { id: 88, title: "Add Two Numbers", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/add-two-numbers/", pattern: "Linked List" },
          { id: 89, title: "Remove Nth Node From End of List", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/", pattern: "Two Pointer" },
          { id: 90, title: "Sort List", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/sort-list/", pattern: "Merge Sort" },
          { id: 91, title: "Reorder List", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/reorder-list/", pattern: "Linked List" },
          { id: 92, title: "Linked List Cycle II (Find Start)", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/linked-list-cycle-ii/", pattern: "Fast/Slow Pointer" },
          { id: 93, title: "Odd Even Linked List", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/odd-even-linked-list/", pattern: "Linked List" },
          { id: 94, title: "Rotate List", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/rotate-list/", pattern: "Linked List" },
          { id: 95, title: "Flatten a Multilevel Linked List", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/flatten-a-multilevel-doubly-linked-list/", pattern: "Linked List" },
          { id: 96, title: "Copy List with Random Pointer", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/copy-list-with-random-pointer/", pattern: "Hashing / Linked List" },
          { id: 97, title: "Reverse Nodes in k-Group", difficulty: "Hard", platform: "LeetCode", url: "https://leetcode.com/problems/reverse-nodes-in-k-group/", pattern: "Linked List" },
          { id: 98, title: "Merge k Sorted Lists", difficulty: "Hard", platform: "LeetCode", url: "https://leetcode.com/problems/merge-k-sorted-lists/", pattern: "Heap + Linked List" },
        ]
      }
    ]
  },

  // ──────────────── 7. Recursion & Backtracking ────────────────
  {
    id: "t7",
    topic: "Recursion & Backtracking",
    description: "Recursive thinking and backtracking patterns for combinatorial problems",
    subtopics: [
      {
        name: "Recursion Patterns",
        problems: [
          { id: 99, title: "Power of Two", difficulty: "Easy", platform: "LeetCode", url: "https://leetcode.com/problems/power-of-two/", pattern: "Recursion" },
          { id: 100, title: "Pow(x, n)", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/powx-n/", pattern: "Recursion" },
          { id: 101, title: "Generate Parentheses", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/generate-parentheses/", pattern: "Recursion" },
          { id: 102, title: "Subsets", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/subsets/", pattern: "Recursion / Bit" },
          { id: 103, title: "Subsets II", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/subsets-ii/", pattern: "Recursion" },
          { id: 104, title: "Permutations", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/permutations/", pattern: "Recursion" },
        ]
      },
      {
        name: "Backtracking",
        problems: [
          { id: 105, title: "Combination Sum", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/combination-sum/", pattern: "Backtracking" },
          { id: 106, title: "Combination Sum II", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/combination-sum-ii/", pattern: "Backtracking" },
          { id: 107, title: "Letter Combinations of a Phone Number", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/letter-combinations-of-a-phone-number/", pattern: "Backtracking" },
          { id: 108, title: "Word Search", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/word-search/", pattern: "Backtracking" },
          { id: 109, title: "Palindrome Partitioning", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/palindrome-partitioning/", pattern: "Backtracking" },
          { id: 110, title: "N-Queens", difficulty: "Hard", platform: "LeetCode", url: "https://leetcode.com/problems/n-queens/", pattern: "Backtracking" },
          { id: 111, title: "Sudoku Solver", difficulty: "Hard", platform: "LeetCode", url: "https://leetcode.com/problems/sudoku-solver/", pattern: "Backtracking" },
          { id: 112, title: "Rat in a Maze", difficulty: "Medium", platform: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/problems/rat-in-a-maze-problem/1", pattern: "Backtracking" },
          { id: 113, title: "M-Coloring Problem", difficulty: "Medium", platform: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/problems/m-coloring-problem-1587115620/1", pattern: "Backtracking" },
          { id: 114, title: "Word Break II", difficulty: "Hard", platform: "LeetCode", url: "https://leetcode.com/problems/word-break-ii/", pattern: "Backtracking + DP" },
        ]
      }
    ]
  },

  // ──────────────── 8. Bit Manipulation ────────────────
  {
    id: "t8",
    topic: "Bit Manipulation",
    description: "Leverage bitwise operations for efficient problem solving",
    subtopics: [
      {
        name: "Basic Bit Problems",
        problems: [
          { id: 115, title: "Single Number", difficulty: "Easy", platform: "LeetCode", url: "https://leetcode.com/problems/single-number/", pattern: "XOR" },
          { id: 116, title: "Number of 1 Bits", difficulty: "Easy", platform: "LeetCode", url: "https://leetcode.com/problems/number-of-1-bits/", pattern: "Bit Manipulation" },
          { id: 117, title: "Counting Bits", difficulty: "Easy", platform: "LeetCode", url: "https://leetcode.com/problems/counting-bits/", pattern: "DP + Bit" },
          { id: 118, title: "Reverse Bits", difficulty: "Easy", platform: "LeetCode", url: "https://leetcode.com/problems/reverse-bits/", pattern: "Bit Manipulation" },
          { id: 119, title: "Power of Two", difficulty: "Easy", platform: "LeetCode", url: "https://leetcode.com/problems/power-of-two/", pattern: "Bit Manipulation" },
          { id: 120, title: "Bitwise AND of Numbers Range", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/bitwise-and-of-numbers-range/", pattern: "Bit Manipulation" },
        ]
      },
      {
        name: "Advanced Bit Problems",
        problems: [
          { id: 121, title: "Single Number II", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/single-number-ii/", pattern: "Bit Manipulation" },
          { id: 122, title: "Single Number III", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/single-number-iii/", pattern: "Bit Manipulation" },
          { id: 123, title: "Divide Two Integers", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/divide-two-integers/", pattern: "Bit Manipulation" },
          { id: 124, title: "Maximum XOR of Two Numbers in Array", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/", pattern: "Trie + Bit" },
          { id: 125, title: "Count Total Set Bits", difficulty: "Hard", platform: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/problems/count-total-set-bits-1587115620/1", pattern: "Bit Manipulation" },
          { id: 126, title: "Minimum Flips to Make a OR b Equal to c", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/minimum-flips-to-make-a-or-b-equal-to-c/", pattern: "Bit Manipulation" },
        ]
      }
    ]
  },

  // ──────────────── 9. Stack and Queue ────────────────
  {
    id: "t9",
    topic: "Stack and Queue",
    description: "Stack, queue, monotonic stack, and advanced stack-based problems",
    subtopics: [
      {
        name: "Stack Fundamentals",
        problems: [
          { id: 127, title: "Valid Parentheses", difficulty: "Easy", platform: "LeetCode", url: "https://leetcode.com/problems/valid-parentheses/", pattern: "Stack" },
          { id: 128, title: "Min Stack", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/min-stack/", pattern: "Stack Design" },
          { id: 129, title: "Implement Queue using Stacks", difficulty: "Easy", platform: "LeetCode", url: "https://leetcode.com/problems/implement-queue-using-stacks/", pattern: "Stack" },
          { id: 130, title: "Implement Stack using Queues", difficulty: "Easy", platform: "LeetCode", url: "https://leetcode.com/problems/implement-stack-using-queues/", pattern: "Queue" },
          { id: 131, title: "Evaluate Reverse Polish Notation", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/evaluate-reverse-polish-notation/", pattern: "Stack" },
          { id: 132, title: "Decode String", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/decode-string/", pattern: "Stack" },
        ]
      },
      {
        name: "Monotonic Stack / Queue",
        problems: [
          { id: 133, title: "Next Greater Element I", difficulty: "Easy", platform: "LeetCode", url: "https://leetcode.com/problems/next-greater-element-i/", pattern: "Monotonic Stack" },
          { id: 134, title: "Daily Temperatures", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/daily-temperatures/", pattern: "Monotonic Stack" },
          { id: 135, title: "Online Stock Span", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/online-stock-span/", pattern: "Monotonic Stack" },
          { id: 136, title: "Asteroid Collision", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/asteroid-collision/", pattern: "Stack" },
          { id: 137, title: "132 Pattern", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/132-pattern/", pattern: "Monotonic Stack" },
          { id: 138, title: "Largest Rectangle in Histogram", difficulty: "Hard", platform: "LeetCode", url: "https://leetcode.com/problems/largest-rectangle-in-histogram/", pattern: "Monotonic Stack" },
          { id: 139, title: "Maximal Rectangle", difficulty: "Hard", platform: "LeetCode", url: "https://leetcode.com/problems/maximal-rectangle/", pattern: "Stack + DP" },
          { id: 140, title: "Sliding Window Maximum", difficulty: "Hard", platform: "LeetCode", url: "https://leetcode.com/problems/sliding-window-maximum/", pattern: "Monotonic Deque" },
          { id: 141, title: "Celebrity Problem", difficulty: "Medium", platform: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/problems/the-celebrity-problem/1", pattern: "Stack" },
        ]
      }
    ]
  },

  // ──────────────── 10. Sliding Window / Two Pointer ────────────────
  {
    id: "t10",
    topic: "Sliding Window & Two Pointer",
    description: "Essential window and pointer techniques for subarray/substring problems",
    subtopics: [
      {
        name: "Two Pointer Technique",
        problems: [
          { id: 142, title: "Two Sum II – Sorted Array", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/", pattern: "Two Pointer" },
          { id: 143, title: "3Sum", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/3sum/", pattern: "Two Pointer" },
          { id: 144, title: "Container With Most Water", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/container-with-most-water/", pattern: "Two Pointer" },
          { id: 145, title: "Squares of a Sorted Array", difficulty: "Easy", platform: "LeetCode", url: "https://leetcode.com/problems/squares-of-a-sorted-array/", pattern: "Two Pointer" },
          { id: 146, title: "Trapping Rain Water", difficulty: "Hard", platform: "LeetCode", url: "https://leetcode.com/problems/trapping-rain-water/", pattern: "Two Pointer" },
        ]
      },
      {
        name: "Sliding Window",
        problems: [
          { id: 147, title: "Longest Substring Without Repeating Characters", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/", pattern: "Sliding Window" },
          { id: 148, title: "Max Consecutive Ones III", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/max-consecutive-ones-iii/", pattern: "Sliding Window" },
          { id: 149, title: "Fruit Into Baskets", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/fruit-into-baskets/", pattern: "Sliding Window" },
          { id: 150, title: "Longest Repeating Character Replacement", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/longest-repeating-character-replacement/", pattern: "Sliding Window" },
          { id: 151, title: "Minimum Size Subarray Sum", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/minimum-size-subarray-sum/", pattern: "Sliding Window" },
          { id: 152, title: "Minimum Window Substring", difficulty: "Hard", platform: "LeetCode", url: "https://leetcode.com/problems/minimum-window-substring/", pattern: "Sliding Window" },
          { id: 153, title: "Subarrays with K Different Integers", difficulty: "Hard", platform: "LeetCode", url: "https://leetcode.com/problems/subarrays-with-k-different-integers/", pattern: "Sliding Window" },
          { id: 154, title: "Count Number of Nice Subarrays", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/count-number-of-nice-subarrays/", pattern: "Sliding Window" },
        ]
      }
    ]
  },

  // ──────────────── 11. Heap / Priority Queue ────────────────
  {
    id: "t11",
    topic: "Heap / Priority Queue",
    description: "Heap data structure for efficient min/max operations",
    subtopics: [
      {
        name: "Heap Basics",
        problems: [
          { id: 155, title: "Kth Largest Element in an Array", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/kth-largest-element-in-an-array/", pattern: "Heap" },
          { id: 156, title: "Last Stone Weight", difficulty: "Easy", platform: "LeetCode", url: "https://leetcode.com/problems/last-stone-weight/", pattern: "Heap" },
          { id: 157, title: "Top K Frequent Elements", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/top-k-frequent-elements/", pattern: "Heap + Hashing" },
          { id: 158, title: "K Closest Points to Origin", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/k-closest-points-to-origin/", pattern: "Heap" },
          { id: 159, title: "Sort Characters By Frequency", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/sort-characters-by-frequency/", pattern: "Heap" },
        ]
      },
      {
        name: "Advanced Heap",
        problems: [
          { id: 160, title: "Task Scheduler", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/task-scheduler/", pattern: "Heap + Greedy" },
          { id: 161, title: "Reorganize String", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/reorganize-string/", pattern: "Heap + Greedy" },
          { id: 162, title: "Find Median from Data Stream", difficulty: "Hard", platform: "LeetCode", url: "https://leetcode.com/problems/find-median-from-data-stream/", pattern: "Two Heaps" },
          { id: 163, title: "Merge k Sorted Lists", difficulty: "Hard", platform: "LeetCode", url: "https://leetcode.com/problems/merge-k-sorted-lists/", pattern: "Heap" },
          { id: 164, title: "Smallest Range Covering Elements from K Lists", difficulty: "Hard", platform: "LeetCode", url: "https://leetcode.com/problems/smallest-range-covering-elements-from-k-lists/", pattern: "Heap + Sliding Window" },
          { id: 165, title: "Kth Smallest Element in a Sorted Matrix", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/", pattern: "Heap / Binary Search" },
        ]
      }
    ]
  },

  // ──────────────── 12. Greedy Algorithms ────────────────
  {
    id: "t12",
    topic: "Greedy Algorithms",
    description: "Make locally optimal choices for globally optimal solutions",
    subtopics: [
      {
        name: "Easy Greedy",
        problems: [
          { id: 166, title: "Assign Cookies", difficulty: "Easy", platform: "LeetCode", url: "https://leetcode.com/problems/assign-cookies/", pattern: "Greedy" },
          { id: 167, title: "Lemonade Change", difficulty: "Easy", platform: "LeetCode", url: "https://leetcode.com/problems/lemonade-change/", pattern: "Greedy" },
          { id: 168, title: "Best Time to Buy and Sell Stock II", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/", pattern: "Greedy" },
          { id: 169, title: "N Meetings in One Room", difficulty: "Easy", platform: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/problems/n-meetings-in-one-room-1587115620/1", pattern: "Greedy" },
        ]
      },
      {
        name: "Medium / Hard Greedy",
        problems: [
          { id: 170, title: "Jump Game", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/jump-game/", pattern: "Greedy" },
          { id: 171, title: "Jump Game II", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/jump-game-ii/", pattern: "Greedy" },
          { id: 172, title: "Gas Station", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/gas-station/", pattern: "Greedy" },
          { id: 173, title: "Minimum Platforms", difficulty: "Medium", platform: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/problems/minimum-platforms-1587115620/1", pattern: "Greedy + Sorting" },
          { id: 174, title: "Job Sequencing Problem", difficulty: "Medium", platform: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/problems/job-sequencing-problem-1587115620/1", pattern: "Greedy" },
          { id: 175, title: "Fractional Knapsack", difficulty: "Medium", platform: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/problems/fractional-knapsack-1587115620/1", pattern: "Greedy" },
          { id: 176, title: "Candy", difficulty: "Hard", platform: "LeetCode", url: "https://leetcode.com/problems/candy/", pattern: "Greedy" },
          { id: 177, title: "Minimum Number of Arrows to Burst Balloons", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/", pattern: "Greedy + Sorting" },
          { id: 178, title: "Insert Interval", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/insert-interval/", pattern: "Greedy + Intervals" },
          { id: 179, title: "Non-overlapping Intervals", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/non-overlapping-intervals/", pattern: "Greedy + Sorting" },
        ]
      }
    ]
  },

  // ──────────────── 13. Binary Trees ────────────────
  {
    id: "t13",
    topic: "Binary Trees",
    description: "Tree traversals, properties, and classic binary tree problems",
    subtopics: [
      {
        name: "Tree Traversals",
        problems: [
          { id: 180, title: "Binary Tree Inorder Traversal", difficulty: "Easy", platform: "LeetCode", url: "https://leetcode.com/problems/binary-tree-inorder-traversal/", pattern: "Tree Traversal" },
          { id: 181, title: "Binary Tree Preorder Traversal", difficulty: "Easy", platform: "LeetCode", url: "https://leetcode.com/problems/binary-tree-preorder-traversal/", pattern: "Tree Traversal" },
          { id: 182, title: "Binary Tree Postorder Traversal", difficulty: "Easy", platform: "LeetCode", url: "https://leetcode.com/problems/binary-tree-postorder-traversal/", pattern: "Tree Traversal" },
          { id: 183, title: "Binary Tree Level Order Traversal", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/binary-tree-level-order-traversal/", pattern: "BFS" },
          { id: 184, title: "Zigzag Level Order Traversal", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/", pattern: "BFS" },
        ]
      },
      {
        name: "Tree Properties",
        problems: [
          { id: 185, title: "Maximum Depth of Binary Tree", difficulty: "Easy", platform: "LeetCode", url: "https://leetcode.com/problems/maximum-depth-of-binary-tree/", pattern: "DFS" },
          { id: 186, title: "Same Tree", difficulty: "Easy", platform: "LeetCode", url: "https://leetcode.com/problems/same-tree/", pattern: "DFS" },
          { id: 187, title: "Symmetric Tree", difficulty: "Easy", platform: "LeetCode", url: "https://leetcode.com/problems/symmetric-tree/", pattern: "DFS" },
          { id: 188, title: "Diameter of Binary Tree", difficulty: "Easy", platform: "LeetCode", url: "https://leetcode.com/problems/diameter-of-binary-tree/", pattern: "DFS" },
          { id: 189, title: "Balanced Binary Tree", difficulty: "Easy", platform: "LeetCode", url: "https://leetcode.com/problems/balanced-binary-tree/", pattern: "DFS" },
          { id: 190, title: "Path Sum", difficulty: "Easy", platform: "LeetCode", url: "https://leetcode.com/problems/path-sum/", pattern: "DFS" },
          { id: 191, title: "Invert Binary Tree", difficulty: "Easy", platform: "LeetCode", url: "https://leetcode.com/problems/invert-binary-tree/", pattern: "DFS" },
        ]
      },
      {
        name: "Medium / Hard Tree Problems",
        problems: [
          { id: 192, title: "Construct BT from Preorder and Inorder", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/", pattern: "Tree Construction" },
          { id: 193, title: "Binary Tree Right Side View", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/binary-tree-right-side-view/", pattern: "BFS / DFS" },
          { id: 194, title: "Flatten Binary Tree to Linked List", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/flatten-binary-tree-to-linked-list/", pattern: "DFS" },
          { id: 195, title: "Lowest Common Ancestor of a Binary Tree", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/", pattern: "DFS" },
          { id: 196, title: "Binary Tree Maximum Path Sum", difficulty: "Hard", platform: "LeetCode", url: "https://leetcode.com/problems/binary-tree-maximum-path-sum/", pattern: "DFS" },
          { id: 197, title: "Vertical Order Traversal", difficulty: "Hard", platform: "LeetCode", url: "https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree/", pattern: "BFS + Sorting" },
          { id: 198, title: "Width of Binary Tree", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/maximum-width-of-binary-tree/", pattern: "BFS" },
          { id: 199, title: "Count Good Nodes in Binary Tree", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/count-good-nodes-in-binary-tree/", pattern: "DFS" },
          { id: 200, title: "Serialize and Deserialize Binary Tree", difficulty: "Hard", platform: "LeetCode", url: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/", pattern: "BFS / DFS" },
          { id: 201, title: "All Nodes Distance K in Binary Tree", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree/", pattern: "BFS + DFS" },
        ]
      }
    ]
  },

  // ──────────────── 14. Binary Search Trees ────────────────
  {
    id: "t14",
    topic: "Binary Search Trees",
    description: "BST-specific operations and problems leveraging the BST property",
    subtopics: [
      {
        name: "BST Operations",
        problems: [
          { id: 202, title: "Search in a BST", difficulty: "Easy", platform: "LeetCode", url: "https://leetcode.com/problems/search-in-a-binary-search-tree/", pattern: "BST" },
          { id: 203, title: "Validate BST", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/validate-binary-search-tree/", pattern: "BST + DFS" },
          { id: 204, title: "Delete Node in a BST", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/delete-node-in-a-bst/", pattern: "BST" },
          { id: 205, title: "Kth Smallest Element in a BST", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/kth-smallest-element-in-a-bst/", pattern: "BST + DFS" },
          { id: 206, title: "Lowest Common Ancestor of a BST", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/", pattern: "BST" },
          { id: 207, title: "Inorder Successor in BST", difficulty: "Medium", platform: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/problems/inorder-successor-in-bst/1", pattern: "BST" },
        ]
      },
      {
        name: "BST Construction & Advanced",
        problems: [
          { id: 208, title: "Convert Sorted Array to BST", difficulty: "Easy", platform: "LeetCode", url: "https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/", pattern: "BST + Divide & Conquer" },
          { id: 209, title: "Two Sum IV – Input is a BST", difficulty: "Easy", platform: "LeetCode", url: "https://leetcode.com/problems/two-sum-iv-input-is-a-bst/", pattern: "BST + Hashing" },
          { id: 210, title: "Recover Binary Search Tree", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/recover-binary-search-tree/", pattern: "BST + DFS" },
          { id: 211, title: "Floor in BST", difficulty: "Medium", platform: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/problems/floor-in-bst/1", pattern: "BST" },
          { id: 212, title: "Ceil in BST", difficulty: "Medium", platform: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/problems/implementing-ceil-in-bst/1", pattern: "BST" },
          { id: 213, title: "Largest BST in Binary Tree", difficulty: "Hard", platform: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/problems/largest-bst/1", pattern: "BST + DFS" },
        ]
      }
    ]
  },

  // ──────────────── 15. Graphs ────────────────
  {
    id: "t15",
    topic: "Graphs",
    description: "Graph traversals, shortest paths, topological sort, and advanced graph algorithms",
    subtopics: [
      {
        name: "BFS / DFS Fundamentals",
        problems: [
          { id: 214, title: "Number of Islands", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/number-of-islands/", pattern: "BFS / DFS" },
          { id: 215, title: "Flood Fill", difficulty: "Easy", platform: "LeetCode", url: "https://leetcode.com/problems/flood-fill/", pattern: "BFS / DFS" },
          { id: 216, title: "Rotting Oranges", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/rotting-oranges/", pattern: "BFS" },
          { id: 217, title: "Clone Graph", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/clone-graph/", pattern: "BFS / DFS" },
          { id: 218, title: "Pacific Atlantic Water Flow", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/pacific-atlantic-water-flow/", pattern: "BFS / DFS" },
          { id: 219, title: "Surrounded Regions", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/surrounded-regions/", pattern: "BFS / DFS" },
          { id: 220, title: "Number of Provinces", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/number-of-provinces/", pattern: "DFS / Union Find" },
          { id: 221, title: "01 Matrix", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/01-matrix/", pattern: "BFS" },
        ]
      },
      {
        name: "Topological Sort & Cycle Detection",
        problems: [
          { id: 222, title: "Course Schedule", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/course-schedule/", pattern: "Topological Sort" },
          { id: 223, title: "Course Schedule II", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/course-schedule-ii/", pattern: "Topological Sort" },
          { id: 224, title: "Detect Cycle in Undirected Graph", difficulty: "Medium", platform: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/problems/detect-cycle-in-an-undirected-graph/1", pattern: "BFS / DFS" },
          { id: 225, title: "Detect Cycle in Directed Graph", difficulty: "Medium", platform: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/problems/detect-cycle-in-a-directed-graph/1", pattern: "DFS" },
          { id: 226, title: "Is Graph Bipartite?", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/is-graph-bipartite/", pattern: "BFS / DFS" },
        ]
      },
      {
        name: "Shortest Path Algorithms",
        problems: [
          { id: 227, title: "Shortest Path in Undirected Graph", difficulty: "Medium", platform: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/problems/shortest-path-in-undirected-graph-having-unit-distance/1", pattern: "BFS" },
          { id: 228, title: "Dijkstra's Algorithm", difficulty: "Medium", platform: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/problems/implementing-dijkstra-set-1-adjacency-matrix/1", pattern: "Dijkstra" },
          { id: 229, title: "Bellman-Ford Algorithm", difficulty: "Medium", platform: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/problems/distance-from-the-source-bellman-ford-algorithm/1", pattern: "Bellman-Ford" },
          { id: 230, title: "Floyd Warshall Algorithm", difficulty: "Medium", platform: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/problems/implementing-floyd-warshall2042/1", pattern: "Floyd Warshall" },
          { id: 231, title: "Word Ladder", difficulty: "Hard", platform: "LeetCode", url: "https://leetcode.com/problems/word-ladder/", pattern: "BFS" },
          { id: 232, title: "Network Delay Time", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/network-delay-time/", pattern: "Dijkstra" },
        ]
      },
      {
        name: "MST & Advanced Graphs",
        problems: [
          { id: 233, title: "Prim's MST Algorithm", difficulty: "Medium", platform: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/problems/minimum-spanning-tree/1", pattern: "Prim's" },
          { id: 234, title: "Kruskal's MST Algorithm (Disjoint Set)", difficulty: "Medium", platform: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/problems/minimum-spanning-tree/1", pattern: "Union Find" },
          { id: 235, title: "Number of Connected Components", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/", pattern: "Union Find" },
          { id: 236, title: "Redundant Connection", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/redundant-connection/", pattern: "Union Find" },
          { id: 237, title: "Alien Dictionary", difficulty: "Hard", platform: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/problems/alien-dictionary/1", pattern: "Topological Sort" },
          { id: 238, title: "Strongly Connected Components (Kosaraju)", difficulty: "Hard", platform: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/problems/strongly-connected-components-kosarajus-algo/1", pattern: "DFS" },
        ]
      }
    ]
  },

  // ──────────────── 16. Dynamic Programming ────────────────
  {
    id: "t16",
    topic: "Dynamic Programming",
    description: "Master DP patterns from 1D to 2D, strings, subsequences, and optimization",
    subtopics: [
      {
        name: "1D DP",
        problems: [
          { id: 239, title: "Climbing Stairs", difficulty: "Easy", platform: "LeetCode", url: "https://leetcode.com/problems/climbing-stairs/", pattern: "1D DP" },
          { id: 240, title: "House Robber", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/house-robber/", pattern: "1D DP" },
          { id: 241, title: "House Robber II", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/house-robber-ii/", pattern: "1D DP" },
          { id: 242, title: "Min Cost Climbing Stairs", difficulty: "Easy", platform: "LeetCode", url: "https://leetcode.com/problems/min-cost-climbing-stairs/", pattern: "1D DP" },
          { id: 243, title: "Decode Ways", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/decode-ways/", pattern: "1D DP" },
          { id: 244, title: "Word Break", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/word-break/", pattern: "1D DP" },
          { id: 245, title: "Coin Change", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/coin-change/", pattern: "Unbounded Knapsack" },
          { id: 246, title: "Longest Increasing Subsequence", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/longest-increasing-subsequence/", pattern: "LIS" },
        ]
      },
      {
        name: "2D / Grid DP",
        problems: [
          { id: 247, title: "Unique Paths", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/unique-paths/", pattern: "2D DP" },
          { id: 248, title: "Unique Paths II", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/unique-paths-ii/", pattern: "2D DP" },
          { id: 249, title: "Minimum Path Sum", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/minimum-path-sum/", pattern: "2D DP" },
          { id: 250, title: "Triangle", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/triangle/", pattern: "2D DP" },
          { id: 251, title: "Maximal Square", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/maximal-square/", pattern: "2D DP" },
          { id: 252, title: "0/1 Knapsack", difficulty: "Medium", platform: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/problems/0-1-knapsack-problem0945/1", pattern: "Knapsack DP" },
          { id: 253, title: "Partition Equal Subset Sum", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/partition-equal-subset-sum/", pattern: "Subset Sum DP" },
          { id: 254, title: "Target Sum", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/target-sum/", pattern: "Knapsack DP" },
        ]
      },
      {
        name: "String DP",
        problems: [
          { id: 255, title: "Longest Common Subsequence", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/longest-common-subsequence/", pattern: "String DP" },
          { id: 256, title: "Edit Distance", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/edit-distance/", pattern: "String DP" },
          { id: 257, title: "Longest Palindromic Subsequence", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/longest-palindromic-subsequence/", pattern: "String DP" },
          { id: 258, title: "Shortest Common Supersequence", difficulty: "Hard", platform: "LeetCode", url: "https://leetcode.com/problems/shortest-common-supersequence/", pattern: "String DP" },
          { id: 259, title: "Distinct Subsequences", difficulty: "Hard", platform: "LeetCode", url: "https://leetcode.com/problems/distinct-subsequences/", pattern: "String DP" },
          { id: 260, title: "Wildcard Matching", difficulty: "Hard", platform: "LeetCode", url: "https://leetcode.com/problems/wildcard-matching/", pattern: "String DP" },
        ]
      },
      {
        name: "Advanced DP",
        problems: [
          { id: 261, title: "Matrix Chain Multiplication", difficulty: "Hard", platform: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/problems/matrix-chain-multiplication0303/1", pattern: "Interval DP" },
          { id: 262, title: "Palindrome Partitioning II", difficulty: "Hard", platform: "LeetCode", url: "https://leetcode.com/problems/palindrome-partitioning-ii/", pattern: "Interval DP" },
          { id: 263, title: "Burst Balloons", difficulty: "Hard", platform: "LeetCode", url: "https://leetcode.com/problems/burst-balloons/", pattern: "Interval DP" },
          { id: 264, title: "Best Time to Buy and Sell Stock with Cooldown", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/", pattern: "State Machine DP" },
          { id: 265, title: "Best Time to Buy and Sell Stock IV", difficulty: "Hard", platform: "LeetCode", url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/", pattern: "State Machine DP" },
          { id: 266, title: "Rod Cutting", difficulty: "Medium", platform: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/problems/rod-cutting0840/1", pattern: "Unbounded Knapsack" },
          { id: 267, title: "Interleaving String", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/interleaving-string/", pattern: "2D DP" },
          { id: 268, title: "Regular Expression Matching", difficulty: "Hard", platform: "LeetCode", url: "https://leetcode.com/problems/regular-expression-matching/", pattern: "String DP" },
        ]
      }
    ]
  },

  // ──────────────── 17. Tries ────────────────
  {
    id: "t17",
    topic: "Tries",
    description: "Trie data structure for efficient string prefix operations",
    subtopics: [
      {
        name: "Trie Implementation & Usage",
        problems: [
          { id: 269, title: "Implement Trie (Prefix Tree)", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/implement-trie-prefix-tree/", pattern: "Trie" },
          { id: 270, title: "Design Add and Search Words", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/design-add-and-search-words-data-structure/", pattern: "Trie + DFS" },
          { id: 271, title: "Word Search II", difficulty: "Hard", platform: "LeetCode", url: "https://leetcode.com/problems/word-search-ii/", pattern: "Trie + Backtracking" },
          { id: 272, title: "Replace Words", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/replace-words/", pattern: "Trie" },
          { id: 273, title: "Longest Word in Dictionary", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/longest-word-in-dictionary/", pattern: "Trie" },
          { id: 274, title: "Maximum XOR of Two Numbers (Trie)", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/", pattern: "Trie + Bit" },
          { id: 275, title: "Palindrome Pairs", difficulty: "Hard", platform: "LeetCode", url: "https://leetcode.com/problems/palindrome-pairs/", pattern: "Trie" },
          { id: 276, title: "Count Distinct Substrings", difficulty: "Hard", platform: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/problems/count-of-distinct-substrings/1", pattern: "Trie" },
        ]
      }
    ]
  },

  // ──────────────── 18. Advanced / Interview Problems ────────────────
  {
    id: "t18",
    topic: "Advanced & Interview Problems",
    description: "Complex design and mixed-concept problems commonly asked in top interviews",
    subtopics: [
      {
        name: "Design Problems",
        problems: [
          { id: 277, title: "LRU Cache", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/lru-cache/", pattern: "Design" },
          { id: 278, title: "LFU Cache", difficulty: "Hard", platform: "LeetCode", url: "https://leetcode.com/problems/lfu-cache/", pattern: "Design" },
          { id: 279, title: "Design Twitter", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/design-twitter/", pattern: "Design + Heap" },
          { id: 280, title: "Implement Stack using Linked List", difficulty: "Easy", platform: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/problems/implement-stack-using-linked-list/1", pattern: "Design" },
        ]
      },
      {
        name: "Mixed Interview Problems",
        problems: [
          { id: 281, title: "Count Inversions (Merge Sort)", difficulty: "Hard", platform: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/problems/inversion-of-array-1587115620/1", pattern: "Divide & Conquer" },
          { id: 282, title: "Reverse Pairs", difficulty: "Hard", platform: "LeetCode", url: "https://leetcode.com/problems/reverse-pairs/", pattern: "Merge Sort" },
          { id: 283, title: "Maximum Sum Rectangle", difficulty: "Hard", platform: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/problems/maximum-sum-rectangle2948/1", pattern: "DP + Kadane's" },
          { id: 284, title: "Kth Permutation Sequence", difficulty: "Hard", platform: "LeetCode", url: "https://leetcode.com/problems/permutation-sequence/", pattern: "Math" },
          { id: 285, title: "Longest Consecutive Sequence", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/longest-consecutive-sequence/", pattern: "Hashing" },
          { id: 286, title: "Count Primes (Sieve)", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/count-primes/", pattern: "Sieve of Eratosthenes" },
          { id: 287, title: "Pow(x, n) — Fast Exponentiation", difficulty: "Medium", platform: "LeetCode", url: "https://leetcode.com/problems/powx-n/", pattern: "Math" },
          { id: 288, title: "Median in a Stream", difficulty: "Hard", platform: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/problems/find-median-in-a-stream-1587115620/1", pattern: "Two Heaps" },
          { id: 289, title: "The Skyline Problem", difficulty: "Hard", platform: "LeetCode", url: "https://leetcode.com/problems/the-skyline-problem/", pattern: "Divide & Conquer / Heap" },
          { id: 290, title: "Design HashMap", difficulty: "Easy", platform: "LeetCode", url: "https://leetcode.com/problems/design-hashmap/", pattern: "Design" },
        ]
      }
    ]
  }
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// HELPERS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function getAllProblems() {
  const problems = [];
  for (const topic of DSA_ROADMAP) {
    for (const sub of topic.subtopics) {
      for (const p of sub.problems) {
        problems.push({ ...p, topic: topic.topic, topicId: topic.id, subtopic: sub.name });
      }
    }
  }
  return problems;
}

const ALL_PROBLEMS = getAllProblems();

function loadProgress() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveProgress(solved) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(solved));
  } catch { /* silently fail */ }
}

function getPlatformColor(platform) {
  switch (platform) {
    case "LeetCode": return { bg: "rgba(255, 161, 22, 0.12)", text: "#ffa116", border: "rgba(255, 161, 22, 0.25)" };
    case "GeeksforGeeks": return { bg: "rgba(45, 181, 93, 0.12)", text: "#2db55d", border: "rgba(45, 181, 93, 0.25)" };
    case "HackerRank": return { bg: "rgba(0, 209, 72, 0.12)", text: "#00d148", border: "rgba(0, 209, 72, 0.25)" };
    case "Codeforces": return { bg: "rgba(31, 141, 214, 0.12)", text: "#1f8dd6", border: "rgba(31, 141, 214, 0.25)" };
    case "CodeChef": return { bg: "rgba(92, 64, 51, 0.15)", text: "#c4a35a", border: "rgba(196, 163, 90, 0.25)" };
    default: return { bg: "rgba(148, 163, 184, 0.12)", text: "#94a3b8", border: "rgba(148, 163, 184, 0.25)" };
  }
}

function getDifficultyConfig(d) {
  switch (d) {
    case "Easy": return { color: "#22c55e", bg: "rgba(34, 197, 94, 0.1)", border: "rgba(34, 197, 94, 0.25)" };
    case "Medium": return { color: "#f59e0b", bg: "rgba(245, 158, 11, 0.1)", border: "rgba(245, 158, 11, 0.25)" };
    case "Hard": return { color: "#ef4444", bg: "rgba(239, 68, 68, 0.1)", border: "rgba(239, 68, 68, 0.25)" };
    default: return { color: "#94a3b8", bg: "rgba(148, 163, 184, 0.1)", border: "rgba(148, 163, 184, 0.25)" };
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SUB-COMPONENTS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/* ─── Progress Bar ─── */
function ProgressBar({ value, max, height = 6, className = "" }) {
  const pct = max > 0 ? (value / max) * 100 : 0;
  return (
    <div className={`w-full rounded-full overflow-hidden ${className}`} style={{ height, background: "rgba(255,255,255,0.06)" }}>
      <motion.div
        className="h-full rounded-full"
        style={{ background: "linear-gradient(90deg, #ef4444, #f97316, #eab308)" }}
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
    </div>
  );
}

/* ─── Difficulty Badge ─── */
function DifficultyBadge({ difficulty }) {
  const c = getDifficultyConfig(difficulty);
  return (
    <span
      className="px-2.5 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap"
      style={{ background: c.bg, color: c.color, border: `1px solid ${c.border}` }}
    >
      {difficulty}
    </span>
  );
}

/* ─── Platform Badge ─── */
function PlatformBadge({ platform }) {
  const c = getPlatformColor(platform);
  return (
    <span
      className="px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap"
      style={{ background: c.bg, color: c.text, border: `1px solid ${c.border}` }}
    >
      {platform}
    </span>
  );
}

/* ─── Problem Row ─── */
function ProblemRow({ problem, isSolved, onToggle }) {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <div className="group">
      <div
        className={`flex items-center gap-3 sm:gap-4 px-3 sm:px-6 py-3 transition-all duration-200 border-b border-white/[0.04] ${
          isSolved ? "bg-green-500/[0.03]" : "hover:bg-white/[0.02]"
        }`}
      >
        {/* Checkbox */}
        <button
          onClick={() => onToggle(problem.id)}
          className="flex-shrink-0 focus:outline-none transform transition-transform hover:scale-110"
          aria-label={isSolved ? "Mark unsolved" : "Mark solved"}
        >
          {isSolved ? (
            <CheckCircle2 className="w-5 h-5 text-green-500" />
          ) : (
            <div className="w-5 h-5 rounded-full border-2 border-gray-600 hover:border-red-500 transition-colors" />
          )}
        </button>

        {/* Problem Info - Click to expand details */}
        <div className="flex-1 min-w-0 cursor-pointer" onClick={() => setShowDetail(!showDetail)}>
          <span className={`text-sm font-medium block truncate ${isSolved ? "text-gray-500 line-through" : "text-gray-200"}`}>
            {problem.title}
          </span>
          {/* Mobile: inline badges */}
          <div className="flex items-center gap-2 mt-1 sm:hidden">
            <DifficultyBadge difficulty={problem.difficulty} />
            <PlatformBadge platform={problem.platform} />
          </div>
        </div>

        {/* Desktop: badges */}
        <div className="hidden sm:flex items-center gap-2">
          {problem.pattern && (
            <span className="text-xs text-gray-500 px-2 py-0.5 bg-white/[0.04] rounded-md hidden lg:inline-block">
              {problem.pattern}
            </span>
          )}
          <DifficultyBadge difficulty={problem.difficulty} />
          <PlatformBadge platform={problem.platform} />
        </div>

        {/* Solve Link */}
        {problem.url && (
          <a
            href={problem.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 bg-white/[0.05] hover:bg-white/[0.1] text-gray-400 hover:text-white border border-white/[0.06] hover:border-white/[0.15]"
            onClick={(e) => e.stopPropagation()}
          >
            Solve <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>

      {/* Expandable Details */}
      <AnimatePresence>
        {showDetail && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-6 sm:px-14 py-3 bg-white/[0.015] border-b border-white/[0.04] text-xs text-gray-400 flex flex-wrap gap-x-6 gap-y-2">
              <div><span className="text-gray-500">Pattern:</span> <span className="text-gray-300">{problem.pattern || "—"}</span></div>
              <div><span className="text-gray-500">Topic:</span> <span className="text-gray-300">{problem.topic}</span></div>
              <div><span className="text-gray-500">Subtopic:</span> <span className="text-gray-300">{problem.subtopic}</span></div>
              <div><span className="text-gray-500">Platform:</span> <span className="text-gray-300">{problem.platform}</span></div>
              <div><span className="text-gray-500">Status:</span> <span className={isSolved ? "text-green-400" : "text-amber-400"}>{isSolved ? "Solved ✓" : "Unsolved"}</span></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Topic Section ─── */
function TopicSection({ topicData, solvedSet, onToggleSolve, isExpanded, onToggle, filteredProblemIds }) {
  // Count solved and total from filteredProblemIds for this topic
  let topicProblems = [];
  for (const sub of topicData.subtopics) {
    for (const p of sub.problems) {
      topicProblems.push({ ...p, topic: topicData.topic, topicId: topicData.id, subtopic: sub.name });
    }
  }

  const visibleProblems = filteredProblemIds
    ? topicProblems.filter(p => filteredProblemIds.has(p.id))
    : topicProblems;

  if (filteredProblemIds && visibleProblems.length === 0) return null;

  const totalAll = topicProblems.length;
  const solvedAll = topicProblems.filter(p => solvedSet.has(p.id)).length;
  const pct = totalAll > 0 ? Math.round((solvedAll / totalAll) * 100) : 0;

  const topicIndex = DSA_ROADMAP.findIndex(t => t.id === topicData.id) + 1;

  return (
    <div className="border-b border-white/[0.06] last:border-0">
      {/* Topic Header */}
      <button
        className="w-full flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-4 sm:py-5 cursor-pointer hover:bg-white/[0.02] transition-colors text-left"
        onClick={onToggle}
      >
        {/* Step Number */}
        <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-sm font-bold"
          style={{ background: "linear-gradient(135deg, rgba(239,68,68,0.15), rgba(249,115,22,0.15))", color: "#f97316", border: "1px solid rgba(249,115,22,0.2)" }}
        >
          {topicIndex}
        </div>

        {/* Title + Progress */}
        <div className="flex-1 min-w-0">
          <h2 className="text-sm sm:text-base font-bold text-white truncate">{topicData.topic}</h2>
          <p className="text-xs text-gray-500 mt-0.5 hidden sm:block">{topicData.description}</p>
          <div className="mt-2">
            <ProgressBar value={solvedAll} max={totalAll} height={4} />
          </div>
        </div>

        {/* Solved / Total + Chevron */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="text-right">
            <span className="text-sm font-bold text-white">{solvedAll}</span>
            <span className="text-xs text-gray-500"> / {totalAll}</span>
            <div className="text-xs text-gray-500">{pct}%</div>
          </div>
          <div className="text-gray-500">
            {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          </div>
        </div>
      </button>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="bg-white/[0.01]">
              {topicData.subtopics.map((sub, si) => {
                const subProblems = sub.problems.map(p => ({
                  ...p, topic: topicData.topic, topicId: topicData.id, subtopic: sub.name
                }));
                const visibleSub = filteredProblemIds
                  ? subProblems.filter(p => filteredProblemIds.has(p.id))
                  : subProblems;

                if (filteredProblemIds && visibleSub.length === 0) return null;

                const subSolved = subProblems.filter(p => solvedSet.has(p.id)).length;

                return (
                  <div key={si}>
                    {/* Subtopic Header */}
                    <div className="flex items-center justify-between px-4 sm:px-8 py-2.5 bg-white/[0.02] border-y border-white/[0.04]">
                      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{sub.name}</h3>
                      <span className="text-xs text-gray-500">{subSolved}/{sub.problems.length}</span>
                    </div>
                    {/* Problems */}
                    {visibleSub.map(p => (
                      <ProblemRow
                        key={p.id}
                        problem={p}
                        isSolved={solvedSet.has(p.id)}
                        onToggle={onToggleSolve}
                      />
                    ))}
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Reset Modal ─── */
function ResetModal({ onConfirm, onCancel }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-md rounded-2xl p-6 border border-white/[0.08]"
        style={{ background: "#13161f" }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(239,68,68,0.15)" }}>
            <RotateCcw className="w-5 h-5 text-red-400" />
          </div>
          <h3 className="text-lg font-bold text-white">Reset Progress</h3>
        </div>
        <p className="text-sm text-gray-400 mb-1">Are you sure you want to reset all DSA sheet progress?</p>
        <p className="text-xs text-gray-500 mb-6">This action cannot be undone. All solved problems will be marked as unsolved.</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-5 py-2.5 rounded-xl text-sm font-medium text-gray-300 bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-colors"
            style={{ background: "linear-gradient(135deg, #ef4444, #dc2626)" }}
          >
            Reset All
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MAIN COMPONENT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export default function DsaSheet() {
  // ─── State ───
  const [solvedIds, setSolvedIds] = useState(() => loadProgress());
  const [expandedTopics, setExpandedTopics] = useState(new Set(["t1"]));
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("All");
  const [platformFilter, setPlatformFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Default");
  const [showResetModal, setShowResetModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const solvedSet = useMemo(() => new Set(solvedIds), [solvedIds]);

  // ─── Persist to localStorage ───
  useEffect(() => {
    saveProgress(solvedIds);
  }, [solvedIds]);

  // ─── Toggle solved ───
  const toggleSolved = useCallback((id) => {
    setSolvedIds(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      return next;
    });
  }, []);

  // ─── Expand / Collapse ───
  const toggleTopic = useCallback((topicId) => {
    setExpandedTopics(prev => {
      const next = new Set(prev);
      next.has(topicId) ? next.delete(topicId) : next.add(topicId);
      return next;
    });
  }, []);

  const expandAll = useCallback(() => {
    setExpandedTopics(new Set(DSA_ROADMAP.map(t => t.id)));
  }, []);

  const collapseAll = useCallback(() => {
    setExpandedTopics(new Set());
  }, []);

  // ─── Reset ───
  const handleReset = useCallback(() => {
    setSolvedIds([]);
    setShowResetModal(false);
  }, []);

  // ─── Filtered problems (for search/filter) ───
  const filteredProblemIds = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    const filtered = ALL_PROBLEMS.filter(p => {
      // Search
      if (q) {
        const haystack = `${p.title} ${p.topic} ${p.subtopic} ${p.platform} ${p.difficulty} ${p.pattern || ""}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      // Difficulty filter
      if (difficultyFilter !== "All" && p.difficulty !== difficultyFilter) return false;
      // Platform filter
      if (platformFilter !== "All" && p.platform !== platformFilter) return false;
      // Status filter
      if (statusFilter === "Solved" && !solvedSet.has(p.id)) return false;
      if (statusFilter === "Unsolved" && solvedSet.has(p.id)) return false;
      return true;
    });

    // Sorting
    if (sortBy === "Difficulty") {
      const order = { Easy: 0, Medium: 1, Hard: 2 };
      filtered.sort((a, b) => (order[a.difficulty] ?? 3) - (order[b.difficulty] ?? 3));
    } else if (sortBy === "Name") {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "Platform") {
      filtered.sort((a, b) => a.platform.localeCompare(b.platform));
    }

    return new Set(filtered.map(p => p.id));
  }, [searchQuery, difficultyFilter, platformFilter, statusFilter, sortBy, solvedSet]);

  const isFiltering = searchQuery || difficultyFilter !== "All" || platformFilter !== "All" || statusFilter !== "All" || sortBy !== "Default";

  // ─── Stats ───
  const stats = useMemo(() => {
    const total = ALL_PROBLEMS.length;
    const solved = solvedIds.length;
    const easy = { total: 0, solved: 0 };
    const medium = { total: 0, solved: 0 };
    const hard = { total: 0, solved: 0 };

    for (const p of ALL_PROBLEMS) {
      const bucket = p.difficulty === "Easy" ? easy : p.difficulty === "Medium" ? medium : hard;
      bucket.total++;
      if (solvedSet.has(p.id)) bucket.solved++;
    }

    return { total, solved, remaining: total - solved, easy, medium, hard, pct: total > 0 ? Math.round((solved / total) * 100) : 0 };
  }, [solvedIds, solvedSet]);

  // ─── Unique platforms for filter ───
  const platforms = useMemo(() => {
    const set = new Set(ALL_PROBLEMS.map(p => p.platform));
    return ["All", ...Array.from(set).sort()];
  }, []);

  return (
    <div className="min-h-screen pt-20 pb-16 relative" style={{ background: "#060610" }}>
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-[0.03]"
          style={{ background: "radial-gradient(circle, #ef4444, transparent)" }} />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full opacity-[0.03]"
          style={{ background: "radial-gradient(circle, #f97316, transparent)" }} />
      </div>

      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">

        {/* ═══ Header ═══ */}
        <div className="mb-6 sm:mb-8">
          <Link
            to="/Dsa"
            className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-red-400 transition-colors mb-4"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to DSA Home
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                DecodeTech <span style={{ background: "linear-gradient(90deg, #ef4444, #f97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>DSA Sheet</span>
              </h1>
              <p className="text-gray-400 text-sm sm:text-base mt-1">A2Z roadmap — master DSA from basics to advanced, one problem at a time.</p>
            </div>
          </div>
        </div>

        {/* ═══ Progress Dashboard ═══ */}
        <div className="mb-6 sm:mb-8 rounded-2xl p-4 sm:p-6 border border-white/[0.06]" style={{ background: "linear-gradient(135deg, rgba(15,17,25,0.8), rgba(20,22,35,0.8))", backdropFilter: "blur(12px)" }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Left — Overall Progress */}
            <div className="flex items-center gap-5">
              {/* Circular Progress */}
              <div className="relative flex-shrink-0">
                <svg width="90" height="90" viewBox="0 0 90 90">
                  <circle cx="45" cy="45" r="38" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
                  <circle
                    cx="45" cy="45" r="38"
                    fill="none"
                    stroke="url(#progressGrad)"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 38}`}
                    strokeDashoffset={`${2 * Math.PI * 38 * (1 - stats.pct / 100)}`}
                    transform="rotate(-90 45 45)"
                    style={{ transition: "stroke-dashoffset 0.8s ease-out" }}
                  />
                  <defs>
                    <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ef4444" />
                      <stop offset="100%" stopColor="#f97316" />
                    </linearGradient>
                  </defs>
                  <text x="45" y="42" textAnchor="middle" fill="white" fontSize="18" fontWeight="800">{stats.pct}%</text>
                  <text x="45" y="56" textAnchor="middle" fill="#6b7280" fontSize="9" fontWeight="500">COMPLETE</text>
                </svg>
              </div>

              {/* Stats text */}
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-400 mb-3">Overall Progress</h3>
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center p-2 rounded-lg" style={{ background: "rgba(34,197,94,0.08)" }}>
                    <div className="text-lg font-bold text-green-400">{stats.solved}</div>
                    <div className="text-[10px] text-gray-500 uppercase font-medium">Solved</div>
                  </div>
                  <div className="text-center p-2 rounded-lg" style={{ background: "rgba(239,68,68,0.08)" }}>
                    <div className="text-lg font-bold text-red-400">{stats.remaining}</div>
                    <div className="text-[10px] text-gray-500 uppercase font-medium">Remaining</div>
                  </div>
                  <div className="text-center p-2 rounded-lg" style={{ background: "rgba(249,115,22,0.08)" }}>
                    <div className="text-lg font-bold text-orange-400">{stats.total}</div>
                    <div className="text-[10px] text-gray-500 uppercase font-medium">Total</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — Difficulty Breakdown */}
            <div>
              <h3 className="text-sm font-semibold text-gray-400 mb-3">Difficulty Breakdown</h3>
              <div className="space-y-3">
                {[
                  { label: "Easy", data: stats.easy, color: "#22c55e" },
                  { label: "Medium", data: stats.medium, color: "#f59e0b" },
                  { label: "Hard", data: stats.hard, color: "#ef4444" },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-3">
                    <span className="text-xs font-semibold w-14" style={{ color: item.color }}>{item.label}</span>
                    <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: item.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${item.data.total > 0 ? (item.data.solved / item.data.total) * 100 : 0}%` }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                      />
                    </div>
                    <span className="text-xs text-gray-400 w-12 text-right font-medium">{item.data.solved}/{item.data.total}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ═══ Search & Filters ═══ */}
        <div className="mb-4 sm:mb-6 space-y-3">
          {/* Search Bar Row */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Search problems by name, topic, pattern, platform..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white placeholder-gray-500 outline-none transition-all border border-white/[0.06] focus:border-red-500/50"
                style={{ background: "rgba(255,255,255,0.03)" }}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`p-3 rounded-xl border transition-colors ${showFilters ? "bg-red-500/10 border-red-500/30 text-red-400" : "bg-white/[0.03] border-white/[0.06] text-gray-400 hover:text-white"}`}
            >
              <Filter className="w-5 h-5" />
            </button>
          </div>

          {/* Filters Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="p-4 rounded-xl border border-white/[0.06] space-y-4" style={{ background: "rgba(255,255,255,0.02)" }}>
                  {/* Row 1: Difficulty */}
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">Difficulty</label>
                    <div className="flex flex-wrap gap-2">
                      {["All", "Easy", "Medium", "Hard"].map(d => (
                        <button
                          key={d}
                          onClick={() => setDifficultyFilter(d)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                            difficultyFilter === d
                              ? "bg-white/[0.1] border-white/[0.2] text-white"
                              : "bg-white/[0.03] border-white/[0.06] text-gray-400 hover:text-white hover:bg-white/[0.06]"
                          }`}
                        >
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Row 2: Platform */}
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">Platform</label>
                    <div className="flex flex-wrap gap-2">
                      {platforms.map(pl => (
                        <button
                          key={pl}
                          onClick={() => setPlatformFilter(pl)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                            platformFilter === pl
                              ? "bg-white/[0.1] border-white/[0.2] text-white"
                              : "bg-white/[0.03] border-white/[0.06] text-gray-400 hover:text-white hover:bg-white/[0.06]"
                          }`}
                        >
                          {pl}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Row 3: Status + Sort */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">Status</label>
                      <div className="flex flex-wrap gap-2">
                        {["All", "Solved", "Unsolved"].map(s => (
                          <button
                            key={s}
                            onClick={() => setStatusFilter(s)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                              statusFilter === s
                                ? "bg-white/[0.1] border-white/[0.2] text-white"
                                : "bg-white/[0.03] border-white/[0.06] text-gray-400 hover:text-white hover:bg-white/[0.06]"
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="flex-1">
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">Sort By</label>
                      <div className="flex flex-wrap gap-2">
                        {["Default", "Difficulty", "Name", "Platform"].map(s => (
                          <button
                            key={s}
                            onClick={() => setSortBy(s)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                              sortBy === s
                                ? "bg-white/[0.1] border-white/[0.2] text-white"
                                : "bg-white/[0.03] border-white/[0.06] text-gray-400 hover:text-white hover:bg-white/[0.06]"
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Clear Filters */}
                  {isFiltering && (
                    <button
                      onClick={() => { setSearchQuery(""); setDifficultyFilter("All"); setPlatformFilter("All"); setStatusFilter("All"); setSortBy("Default"); }}
                      className="text-xs text-red-400 hover:text-red-300 font-medium transition-colors"
                    >
                      ✕ Clear all filters
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ═══ Expand / Collapse Controls ═══ */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 font-medium">
              {ALL_PROBLEMS.length} problems across {DSA_ROADMAP.length} topics
              {isFiltering && ` · ${filteredProblemIds.size} matching`}
            </span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={expandAll}
              className="text-xs text-gray-400 hover:text-white font-medium px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] transition-colors"
            >
              Expand All
            </button>
            <button
              onClick={collapseAll}
              className="text-xs text-gray-400 hover:text-white font-medium px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] transition-colors"
            >
              Collapse All
            </button>
          </div>
        </div>

        {/* ═══ Topics Accordion ═══ */}
        <div className="rounded-2xl border border-white/[0.06] overflow-hidden" style={{ background: "rgba(255,255,255,0.015)" }}>
          {DSA_ROADMAP.map(topic => (
            <TopicSection
              key={topic.id}
              topicData={topic}
              solvedSet={solvedSet}
              onToggleSolve={toggleSolved}
              isExpanded={expandedTopics.has(topic.id)}
              onToggle={() => toggleTopic(topic.id)}
              filteredProblemIds={isFiltering ? filteredProblemIds : null}
            />
          ))}
        </div>

        {/* ═══ No Results ═══ */}
        {isFiltering && filteredProblemIds.size === 0 && (
          <div className="text-center py-16">
            <Search className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 font-medium">No problems match your filters</p>
            <p className="text-gray-500 text-sm mt-1">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* ═══ Reset Progress ═══ */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setShowResetModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:text-red-400 bg-white/[0.03] hover:bg-red-500/[0.06] border border-white/[0.06] hover:border-red-500/20 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            Reset Progress
          </button>
        </div>

        {/* Footer info */}
        <div className="mt-6 text-center text-xs text-gray-600">
          Progress is saved locally in your browser. • DecodeTech DSA Sheet
        </div>
      </div>

      {/* ═══ Reset Modal ═══ */}
      <AnimatePresence>
        {showResetModal && (
          <ResetModal
            onConfirm={handleReset}
            onCancel={() => setShowResetModal(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
