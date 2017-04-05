---
layout: post
title: 数据结构：二叉搜索树
category: 数据结构与算法
tags: 进阶 数据结构与算法
keywords: 蓝桥 lanqiao 教程 二叉搜索树
description: 本文介绍二叉搜索树的实现运用。
author: 郑未
---

# 定义

一颗二叉查找树是按二叉树结构来组织的。这样的树可以用链表结构来表示，其中每一个结点都是一个对象。结点中
除了key域和卫星数据外，还包括域lchild、rchild和p，它们分别指向结点的做子树和右子树和父节点。如果某个子树不存在，则相应的指针域中的值为NULL。

# 特性

为了方便起见，key[x]表示结点x的关键字。对于二叉查找树，任何结点x，其左子树的关键字
最大不超过key[x]，其右子树中的关键字最小不小于key[x]。

不同的二叉查找树可以表示同一组值，这和建立二叉查找树时插入结点的次序有关。

![](/public/img/algorithm/binarysearchtree.png)

# 实现

    package org.lanqiao.algo.datastructure;

    import java.util.function.Consumer;

    /**
     * 二叉搜索树
     * 
     * @author zhengwei lastmodified 2017年3月22日
     *
     */
    public class BinarySearchTree {
      private Node root;
      private int size;

      public void insert(Object x) {
        if (!(x instanceof Comparable)) {
          throw new ClassCastException();
        }
        
        Node p = null;
        Node curr = root;
        while(curr!=null){
          p=curr;
          if(compare(x, curr.key)<0){
            curr = curr.left;
          }else if(compare(x, curr.key)>0){
            curr = curr.right;
          }else{
            curr.key = x;
            return;
          }
        }
        curr = new Node(x, null, null, null);
        curr.parent = p;
        if(p==null){
          root = curr;
        }else if(compare(x, p.key)<0){
          p.left=curr;
          curr.isLeftChild=true;
        }else{
          p.right=curr;
          curr.isLeftChild=false;
        }
        
        size++;
      }
      @SuppressWarnings({ "unchecked", "rawtypes" })
      private int compare(Object key1, Object key2) {
        return ((Comparable) key1).compareTo((Comparable) key2);
      }
      /**
       * 中序遍历
       * 
       * @param con
       *          处理中序遍历的每个元素的函数
       */
      public void inorder(Consumer<Object> con) {
        if (root != null)
          inorder(root, con);
      }

      private void inorder(Node p, Consumer<Object> con) {
        if (p != null) {
          inorder(p.left, con);
          con.accept(p.key);
          inorder(p.right, con);
        }
      }

      public Object lookup(Object key) {
        return lookupNode(key).key;
      }

      private Node lookupNode(Object key) {
        Node p = root;
        while (p != null && compare(key, p.key)!=0 ) {
          if (compare(key,p.key) < 0)
            p = p.left;
          else
            p = p.right;
        }
        return p;
      }

      public Object min() {
        return minNode(root).key;
      }

      private Node minNode(Node p) {
        while (p.left != null) {
          p = p.left;
        }
        return p;
      }

      public Object max() {
        return maxNode(root).key;
      }

      private Node maxNode(Node p) {
        while (p.right != null) {
          p = p.right;
        }
        return p;
      }

      public void remove(Object key) {
        removeNode(lookupNode(key));
      }

      private void removeNode(Node x) {
        if (x != null) {
          if (x.left == null && x.right == null) {// 没有子节点
            if (x.isLeftChild) {
              x.parent.left = null;
            } else {
              if (x.parent != null) {
                x.parent.right = null;
              } else {// 根节点
                root = null;
              }
            }
          } else if (x.left == null) {// 有子节点但左子为空
            if (x.isLeftChild) {
              x.parent.left = x.right;
            } else {
              if (x.parent != null) {
                x.parent.right = x.right;
              } else {// 根节点
                root = x.right;
              }
            }
          } else if (x.right == null) {// 有子节点但右子为空
            if (x.isLeftChild) {
              x.parent.left = x.left;
            } else {
              if (x.parent != null) {
                x.parent.right = x.left;
              } else { // 根节点
                root = x.left;
              }
            }
          } else {// 都不为空
            Node minOfRight = minNode(x.right);
            x.key = minOfRight.key;
            removeNode(minOfRight);
          }
        }
      }

      private class Node {
        public Object key;
        public Node left;
        public Node right;
        public Node parent;
        public boolean isLeftChild;

        public Node(Object key, Node left, Node right, Node parent) {
          super();
          this.key = key;
          this.left = left;
          this.right = right;
          this.parent = parent;
        }

        @Override
        public String toString() {
          return "Node [key=" + key + "]";
        }

      }

      public int getSize() {
        return size;
      }
    }





