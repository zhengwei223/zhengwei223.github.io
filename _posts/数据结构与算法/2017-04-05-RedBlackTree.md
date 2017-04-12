---
layout: post
title: 数据结构：红黑树
category: 数据结构与算法
tags: 进阶 数据结构与算法
keywords: 蓝桥 lanqiao 教程 红黑树
description: 本文介绍红黑树的实现和运用。
author: 郑未
---

# 前言

红黑树是一类特殊的二叉查找树，是一颗平衡的二叉查找树，但只是接近平衡。它能保证在最坏情况下，基本的动态集合操作的时间为O(lgN)。

我们知道在二叉查找树上执行的基本操作的时间和树的高度成正比。对于一颗含有N个结点的完全二叉树，在有些情况下，可能会形成一个斜树，这样的话其高度就是结点个数，这样时间复杂度为O(N)，显然我们并不希望出现这样的情况，通过随机插入结点可以降低这个情况的出现，但还是不能保证这种情况的不出现。那么这时，我们的红黑树就派上用场了。它能保证在最坏情况下，基本的动态集合操作的时间为O(lgN)。

# 性质

一颗二叉查找树如果满足下面的红黑性质，则为一颗红黑树：

1）、每个结点或是红的，或是黑的

2）、根结点是黑的

3）、每个叶结点(NIL)是黑的

4）、如果一个结点是红的，那么它的两个子结点都是黑的

5）、对每个结点，从该结点到其子孙结点的所有路径上包含相同数目的黑结点

几点说明：

上面提到的叶结点(NIL)和我们之前讲树的叶子结点是不同的。这里的NIL是一个哨兵，是为了方便处理红黑树代码中的边界条件。

                        4
               1                   5
      NIL          NIL    NIL        NIL

像上面的二叉查找树，如果是一般的二叉查找树的话，那么1和5就是叶子结点了，其指针域的左右孩子指针都指向NULL。对于红黑树的话，四个NIL就是叶子结点了。还有就是根结点的p指针也是指向NIL的。

如果这里的叶结点的概念没搞清楚的话，对后面的理解以及代码的编写都会造成干扰。

# 基本操作

对红黑树的主要操作就是查询、插入和删除了。因为红黑树本身就是一颗二叉查找树，而且查询操作不会对树作修改，所以查询和二叉查找树是一样的，直接递归即可。但插入和删除对树作了修改，这时新的二叉查找树可能已经不是红黑树了，所以我们必须进行一些调整来使其保持红黑树的性质。 而为了保持这些性质，就要改变树中某些结点的颜色以及指针结构。


# 节点设计

相对普通二叉搜索树，红黑树增加了一个颜色信息：

    package org.lanqiao.algo.datastructure;

    import java.util.Optional;
    import java.util.function.Consumer;

    /**
     - 红黑树 <br/>
     - 1)每个节点要么是红色要么是黑色 
     - 2)根节点是黑色的 
     - 3)每个叶子节点(NIL)是黑色 
     - 4)红色节点的的子节点都是黑色的
     - 5)对每个节点，从该节点到其后代叶子节点的简单路径上，均包含数目相同的黑色节点
     - 
     - 通常我们认为树末梢的节点还有两个为空的节点，这些空节点是黑色的，所以不必检测第三条
     - 
     - @author zhengwei
     *
     */
    public class RedBlackTree {
      private static final boolean RED   = false;
      private static final boolean BLACK = true;
      private BRNode  root;
      private int     size  = 0;

      //……

      private class BRNode {
        public Object   key;
        public BRNode   left;
        public BRNode   right;
        public BRNode   parent;
        public boolean  isLeftChild;
        boolean         isRed = true;

        public BRNode(Object key, BRNode left, BRNode right, BRNode parent) {
          super();
          this.key = key;
          this.left = left;
          this.right = right;
          this.parent = parent;
        }

        @Override
        public String toString() {
          StringBuilder sb = new StringBuilder( "[" + (isRed ? "R" : "B") + ":" + key + "]" );
          Optional.ofNullable(this.parent).ifPresent(e->{
            sb.append("p=").append(e.key);
          });
          return sb.toString();
        }

      }

    }


# 插入

由于插入操作会改变树的结构，因此二叉搜索树可能变得不平衡。为了保持红黑树的性质，我们需要在插入操作后进行变换来修复问题。

当插入一个key时，我们可以把新节点统一染为红色。只要它不是根节点。所以除了第四条性质，所有其他性质都可以满足，唯一的问题就是可能引入两个相邻的红色节点。

共有四种情况会违反红黑树的第4）性质，它们都带有两个相邻的红色节点，而且它们可以被修复为一个统一的形式，这点很关键，如图所示：

![](/public/algorithm/brtree-insert.png)


## 上代码

    public void insert(Object x) {
      BRNode p = null;
      BRNode curr = root;
      while (curr != null) {
        p = curr;
        if (compare(x, curr.key) < 0) {
          curr = curr.left;
        } else if (compare(x, curr.key) > 0) {
          curr = curr.right;
        } else {
          curr.key = x;
          return;
        }
      }

      curr = new BRNode(x, null, null, null);
      curr.parent = p;
      if (p == null) {
        root = curr;
      } else if (compare(x, p.key) < 0) {
        p.left = curr;
        curr.isLeftChild = true;
        fixAfterInsert(p, curr);
      } else {
        p.right = curr;
        curr.isLeftChild = false;
        fixAfterInsert(p, curr);
      }

      colorBlack(root);// 根节点染黑
      size++;
    }

红黑树的插入，主要代码和二叉搜索树没什么两样，只是增加了一个修复的过程：

    /**
     - 保持树的平衡
     - 
     - @param parent
     -          新增节点的父节点
     - @param newNode
     -          新增节点
     - @return
     */
    private void fixAfterInsert(BRNode parent, BRNode newNode) {
      if (parent == null) {
        root = newNode;
        return;
      }
      if (colorOf(parent)==RED&&colorOf(newNode)==RED) {
        //虚位以待，把四种情况的ABC和xyz定好，然后统一处理
        BRNode A = null, B = null, C = null, D = null, x = null, y = null, z = null;
        // case 1 左左
        if (parent.isLeftChild && newNode.isLeftChild) {
          x = newNode;
          A = x.left;
          B = x.right;

          y = parent;
          C = y.right;

          z = y.parent;
          D = z.right;

          changePeek(y, z);
        }
        // case 2 右右
        else if (!parent.isLeftChild && !newNode.isLeftChild) {
          z = newNode;
          C = z.left;
          D = z.right;

          y = z.parent;
          B = y.left;

          x = y.parent;
          A = x.left;

          changePeek(y, x);
        }
        // case 3 左右
        else if (parent.isLeftChild && !newNode.isLeftChild) {
          y = newNode;
          B = y.left;
          C = y.right;

          x = y.parent;
          A = x.left;

          z = x.parent;
          D = z.right;

          changePeek(y, z);
        }
        // case 4 右左
        else if (!parent.isLeftChild && newNode.isLeftChild) {
          y = newNode;
          B = y.left;
          C = y.right;

          z = y.parent;
          D = z.right;

          x = z.parent;
          A = x.left;

          changePeek(y, x);
        }
    //-----------统一变为一种形式，换父子链接并染色--------------
        x.parent = y;
        z.parent = y;
        y.left = x;
        y.right = z;
        x.left = A;
        if (A != null)
          A.parent = x;
        x.right = B;
        if (B != null)
          B.parent = x;
        z.left = C;
        z.right = D;
        if (C != null)
          C.parent = z;
        if (D != null)
          D.parent = z;

        colorBlack(x);
        colorBlack(z);
        colorRed(y);
        //      递归向上追溯
        fixAfterInsert(y.parent, y);
      }
    }

    /**
     - 切换顶点，设施newPeek为新顶点
     - 
     - @param newPeek
     -          新顶点
     - @param oldPeek
     -          旧顶点
     */
    private void changePeek(BRNode newPeek, BRNode oldPeek) {
      newPeek.parent = oldPeek.parent;
      newPeek.isLeftChild = oldPeek.isLeftChild;
      if (oldPeek.parent != null) {
        if (oldPeek.isLeftChild)
          oldPeek.parent.left = newPeek;
        else
          oldPeek.parent.right = newPeek;
      } else {
        root = newPeek;
      }
    }
    private void colorRed(BRNode node) {
      if (null != node)
        node.isRed = true;
    }

    private void colorBlack(BRNode node) {
      if (null != node)
        node.isRed = false;
    }

    @SuppressWarnings({ "unchecked", "rawtypes" })
    private int compare(Object key, Object key2) {
      return ((Comparable) key).compareTo((Comparable) key2);
    }

    private boolean colorOf(BRNode x) {
      if(x==null)
        return false;
      return x.isRed;
    }


# 删除

删除时我们面临更多需要修复平衡的情况。首先我们还是按照二叉搜索树的删除来处理节点，不过我们需要考虑删除了黑色节点之后的种种情况——删除红色节点，不影响红黑树平衡性质。

    public void remove(Object key) {
      BRNode p = lookupNode(key);
      if (p == null)
        return;
      size--;

      // 如果是严格的内部节点，拷贝后继元素的内容到待删节点，然后p指向后继，合并到后面一同处理
      if (p.left != null && p.right != null) {
        BRNode s = successor(p);// 后继
        p.key = s.key;
        p = s;  // p指向其后继，是待删除的
      } // p has 2 children

      // 用于顶替待删节点的
      BRNode replacement = (p.left != null ? p.left : p.right);
      // 有一个孩子的情况处理
      if (replacement != null) {
        // Link replacement to parent
        replacement.parent = p.parent;
        if (p.parent == null)
          root = replacement;
        else if (p == p.parent.left) { // p是左孩子
          p.parent.left = replacement;
          replacement.parent = p.parent;
          replacement.isLeftChild = true;
        } else {  // p是右孩子
          p.parent.right = replacement;
          replacement.parent = p.parent;
          replacement.isLeftChild = false;
        }

        // Null out links so they are OK to use by fixAfterDeletion.
        p.left = p.right = p.parent = null;

        // Fix replacement
        if (colorOf(p)==BLACK)
          fixAfterDeletion(replacement);
      } // p has 1 children
      else if (p.parent == null) { // return if we are the only node.
        root = null;
      } else { // No children. Use self as phantom replacement and unlink.
        if (colorOf(p)==BLACK)
          fixAfterDeletion(p);// 先修复再cut掉

        if (p.parent != null) {
          if (p == p.parent.left)
            p.parent.left = null;
          else if (p == p.parent.right)
            p.parent.right = null;
          p.parent = null;
        }
      }

    }

接下来要进行修复：

    private void fixAfterDeletion(BRNode x) {
        //顶替被删节点的是黑色
        if (x != root && colorOf(x) == BLACK) {
    //      x是左孩子
          if (x.isLeftChild) {
              BRNode sib = x.parent.right;//兄弟节点
    /*-------情况一：兄弟为红色-------*/
    //              黑
    //        x=黑             红
    //       l    r   黑   黑
              if (colorOf(sib)==RED) {
                 colorBlack(sib);
                 colorRed(x.parent);
                 //  左旋
                 rotateLeft(x.parent);
              }// 兄弟是红色，由于当前子树比兄弟子树少了一个黑色，交换兄弟和父亲的颜色，父节点左旋
              
    /*-------情况二：兄弟为黑色,兄弟的儿子都是黑色-------
     * 将兄弟染为红色，x指向父节点递归*/
    //        ?
    //  x=黑             黑
    // l    r   B   B
              else if (colorOf(leftOf(sib))==BLACK&&colorOf(rightOf(sib))==BLACK) {
                  colorRed(sib);
                  fixAfterDeletion(x.parent);
              } 
              
              else {
    /*-------情况三：兄弟为黑色,兄弟的左儿子是红色-------
    */
    //                  ?
    //            x=黑             黑
              // l    r   R   B   
                  if (colorOf(rightOf(sib)) == BLACK) {
                    colorRed(sib);  // 兄弟变红
                      colorBlack(leftOf(sib));// 兄弟左孩染黑
                      //  兄弟右旋
                      rotateRight(sib);
    //                ?
    //          x=黑             黑（原左子）
            // l    r       红（原兄弟）
    //                          B（原右子）  
                      sib = rightOf(x.parent); // 形成新的兄弟
                  } // 转变为情况四
    //            ?
    //      x=黑             黑
        // l    r   l   红
    //                    黑               
                  setColor(sib, colorOf(x.parent)); 
                  setColor(x.parent, BLACK); // 黑
    //            黑
    //      x=黑        ?
        // l    r   l   红
    //                    黑              
                  setColor(rightOf(sib), BLACK);// 兄弟右孩子染黑
                  //  父节点左旋
                 rotateLeft(x.parent);
              }
          } else { // 对称的
            BRNode sib = x.parent.left;//兄弟节点
    /*-------情况一：兄弟为红色,兄弟的父子都是黑色-------*/
    //            黑
    //        红        x=黑   
    //     黑    黑           l    r   
            if (colorOf(sib)==RED) {
               colorBlack(sib);
               colorRed(x.parent);
               //  右旋
               rotateRight(x.parent);
            }// 兄弟是红色，由于当前子树比兄弟子树少了一个黑色，交换兄弟和父亲的颜色，父节点右旋
            
    /*-------情况二：兄弟为黑色,兄弟的儿子都是黑色-------*/

    //      ?
    //   黑          x=黑 
    //B   B     l    r   
            else if (colorOf(leftOf(sib))==BLACK&&colorOf(rightOf(sib))==BLACK) {
                colorRed(sib);
                fixAfterDeletion(x.parent);
            } /* 将兄弟染为红色，这样所有两边都少了一个黑色，x指向父节点递归*/
            
            else {
    /*-------情况三：兄弟为黑色,兄弟的右儿子是红色-------
    */
    //                ?
    //                  黑                  x=黑
            // B    R   l    r     
                if (colorOf(rightOf(sib)) == RED) {
                  colorRed(sib);  // 兄弟变红
                  colorBlack(leftOf(sib));// 兄弟左孩染黑
                  //  兄弟左旋
                  rotateLeft(sib);
    //              ?
    //        黑（原右子）         x=黑              
          // 红（原兄弟）         l    r      
    //      B（原左子）                    
                  sib = leftOf(x.parent); // 形成新的兄弟
                } // 转变为情况四：兄弟左儿子为红
    //          ?
    //      黑      x=黑
      //  红   r   l    r   
                                
                setColor(sib, colorOf(x.parent)); 
                setColor(x.parent, BLACK); // 黑
    //          黑
    //      黑/红      x=黑
      //  红   r   l    r                         
                setColor(leftOf(sib), BLACK);// 兄弟左孩子染黑
                //  父节点右旋
               rotateRight(x.parent);
            }
          }
        } else {
          // 顶替被删节点的是红色
          colorBlack(x);// 如果x是红色，将其染黑即可，因为当前子树比兄弟子树少一个黑色
        }
    }


完整代码请看[红黑树的实现](/ref/RedBlackTree)