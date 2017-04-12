---
layout: post
title: 数据结构：红黑树
category: ref
tags: 进阶 数据结构与算法
keywords: 蓝桥 lanqiao 教程 红黑树
description: 
author: 郑未
---

    package org.lanqiao.algo.datastructure;

    import java.util.Optional;
    import java.util.function.Consumer;

    /**
     * 红黑树 <br/>
     * 1)每个节点要么是红色要么是黑色 2)根节点是黑色的 3)每个叶子节点(NIL)是黑色 4)红色节点的的子节点都是黑色的
     * 5)对每个节点，从该节点到其后代叶子节点的简单路径上，均包含数目相同的黑色节点
     * 
     * 通常我们认为树末梢的节点还有两个为空的节点，这些空节点是黑色的，所以不必检测第三条
     * 
     * @author zhengwei
     *
     */
    public class RedBlackTree {
      private static final boolean RED   = true;
      private static final boolean BLACK = false;
      private BRNode  root;
      private int     size  = 0;

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

      /**
       * 中序遍历
       * 
       * @param con
       *          处理中序遍历的每个元素的函数
       */
      public void inorder(Consumer<Object> con) {
        inorder(root, con);
      }

      // 消费节点的key
      private void inorder(BRNode p, Consumer<Object> con) {
        if (p != null) {
          inorder(p.left, con);
          con.accept(p.key);
          inorder(p.right, con);
        }
      }

      // 消费node
      private void inorderNode(BRNode p, Consumer<BRNode> con) {
        if (p != null) {
          inorderNode(p.left, con);
          con.accept(p);
          inorderNode(p.right, con);
        }
      }

      // 前序遍历
      private void preOrderNode(BRNode p, Consumer<BRNode> con) {
        if (p != null) {
          con.accept(p);
          preOrderNode(p.left, con);
          preOrderNode(p.right, con);
        }
      }

      /**
       * 保持树的平衡
       * 
       * @param parent
       *          新增节点的父节点
       * @param newNode
       *          新增节点
       * @return
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
    //------------------统一变为一种形式，换父子链接并染色----------------------
          x.parent = y;
          z.parent = y;
          y.left = x;
          y.right = z;
          x.left = A;
          if (A != null){
            A.parent = x;
            A.isLeftChild=true;
          }
          x.right = B;
          if (B != null){
            B.parent = x;
            B.isLeftChild=false;
          }
          z.left = C;
          z.right = D;
          if (C != null){
            C.parent = z;
            C.isLeftChild=true;
          }
          if (D != null){
            D.parent = z;
            D.isLeftChild=false;
          }
          x.isLeftChild=true;
          z.isLeftChild=false;
          colorBlack(x);
          colorBlack(z);
          colorRed(y);
    //      递归向上追溯
          fixAfterInsert(y.parent, y);
        }

      }

      /**
       * 切换顶点，设施newPeek为新顶点
       * 
       * @param newPeek
       *          新顶点
       * @param oldPeek
       *          旧顶点
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
      

      private void rotateRight(BRNode p) {
        //
        if (p != null) {
          BRNode l = p.left;
          p.left = l.right;
          if (l.right != null)
            l.right.parent = p;
          l.parent = p.parent;
          if (p.parent == null)
            root = l;
          else if (p.parent.right == p)
            p.parent.right = l;
          else
            p.parent.left = l;
          l.right = p;
          p.parent = l;
        }
      }

      private void rotateLeft(BRNode p) {
        if (p != null) {
          BRNode r = p.right;
          p.right = r.left;
          if (r.left != null)
            r.left.parent = p;
          r.parent = p.parent;
          if (p.parent == null)
            root = r;
          else if (p.parent.left == p)
            p.parent.left = r;
          else
            p.parent.right = r;
          r.left = p;
          p.parent = r;
        }
      }

      private void setColor(BRNode sib, boolean colorOf) {
        if(sib!=null)
          sib.isRed=colorOf;
      }

      private BRNode rightOf(BRNode parent) {
        return parent.right;
      }

      private BRNode leftOf(BRNode parent) {
        return parent.left;
      }

      private boolean colorOf(BRNode x) {
        if(x==null)
          return false;
        return x.isRed;
      }

      private BRNode successor(BRNode p) {
        // 有右子树
        if (null != p.right) {
          // 返回右子树的最小值
          BRNode peek = p.right;
          BRNode min = peek.left;
          while (min != null) {
            peek = min;
            min = min.left;
          }
          return peek;
        }
        // 没有右子树
        while (p.parent != null && !p.isLeftChild) {
          p = p.parent;
        }
        return p.parent;
      }

      /**
       * 查找元素
       * 
       * @param key
       * @return
       */
      public Object lookup(Object key) {
        return lookupNode(key).key;
      }

      private BRNode lookupNode(Object key) {
        BRNode p = root;
        while (p != null && compare(key, p.key) != 0) {
          if (compare(key, p.key) < 0)
            p = p.left;
          else
            p = p.right;
        }
        return p;
      }

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

      /**
       * 按层次遍历
       * 
       * @return
       */
      public String hierarchyBiTree() {
        if (root == null)
          return "";

        StringBuilder sb = new StringBuilder();
        IQueue queue = new QueueImpl();
        queue.enqueue(root); // 先进root
        queue.enqueue("\n"); // 换层标志
        int level = 1;
        while (queue.size() > 0) {
          Object obj = queue.dequeue(); // 出队列
          try {
            BRNode node = (BRNode) obj;// 可能是一个节点，也可能是换行符
            sb.append(node == null ? "" : (node.toString() + "\t")); // 处理出队的元素
            // 左节点进队
            if (node.left != null)
              queue.enqueue(node.left);
            // 右节点进队
            if (node.right != null)
              queue.enqueue(node.right);
            // 如果上一个换行伪节点出队列，添加了左右子节点后再进入一个换行伪节点
            if (queue.indexOf("\n") == 0) {
              queue.enqueue("\n");
              level++;
            }
          } catch (Exception e) {
            sb.append(obj); // 添加一个换行
          }
        }
        sb.append("level==").append(level - 1);
        return sb.toString();

      }

      public String toString() {
        return hierarchyBiTree();
      }
    }
