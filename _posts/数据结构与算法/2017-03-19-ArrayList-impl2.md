---
layout: post
title: 利用数组实现顺序表（严谨）
category: ref
tags: 进阶 数据结构与算法
keywords: 蓝桥 lanqiao 教程 数据结构 算法 顺序表 ArrayList
description: 
author: 郑未
---
# 代码实现

    /**
     * 在这个版本中，我们考虑得更加全面，充分考虑元素的紧密排列和扩容问题
     * 
     * @author zhengwei
     *
     */
    public class ArrayList2 implements IList {
        // 使用对象数组作为数据的实际持有者
        private Object[] data;
        private int size = 0;// 实际元素个数
        private final int DELTA; // 扩容的增量

        public ArrayList2() {
            data = new Object[20];
            DELTA = 20;
        }

        public ArrayList2(int capacity) {
            data = new Object[capacity];
            DELTA = capacity;
        }

        /**
         * 遍历搜索
         */
        @Override
        public Object search(Object key) {

            for (int i = 0; i < data.length; i++) {
                if ((data[i] == null && key == null) || (key.equals(data[i])))
                    return data[i];
            }
            return null;
        }

        @Override
        public int size() {
            return size;
        }

        @Override
        public boolean isEmpty() {
            return size == 0;
        }

        @Override
        public boolean contains(Object key) {
            return search(key) != null;
        }

        @Override
        public void add(Object e) {
            // 如果元素个数等于数组现在的长度，那说明现在的集合已经存满了，我们必须要扩容
            if (size == data.length) {
                Object[] data2 = new Object[size + DELTA];
                // COPY
                for (int i = 0; i < data.length; i++) {
                    data2[i] = data[i];
                }
                // switch
                data = data2;
            }
            data[size] = e;
            size++;
        }

        @Override
        public void remove(Object key) {
            for (int i = 0; i < data.length; i++) {
                if ((data[i] == null && key == null) || (key.equals(data[i]))) {
                    data[i] = null;
                    // 后继元素前移
                    for (int j = i; j < size - 1; j++) {
                        data[j] = data[j + 1];
                    }
                    size--;
                    return;
                }
            }
        }

        @Override
        public int indexOf(Object key) {
            for (int i = 0; i < data.length; i++) {
                if ((data[i] == null && key == null) || (key.equals(data[i])))
                    return i;
            }
            return -1;
        }

        @Override
        public void add(Object e, int index) {
            // 如果元素个数等于数组现在的长度，那说明现在的集合已经存满了，我们必须要扩容
            if (size == data.length) {
                Object[] data2 = new Object[size + DELTA];
                // COPY
                for (int i = 0; i < data.length; i++) {
                    data2[i] = data[i];
                }
                // switch
                data = data2;
            }
            // 如果索引超出当前大小
            if (index >= size) {
                add(e);
                size++;
                return;
            }
            for (int j = size; j > index; j--) {
                data[j] = data[j - 1];
            }
            data[index] = e;
            size++;
        }

        @Override
        public void delete(int index) {
            if (index >= size)
                return;
            for (int i = index; i < size - 1; i++) {
                data[i] = data[i + 1];
            }
            size--;
        }

        @Override
        public Object get(int index) {
            return data[index];
        }

        @Override
        public String toString() {
            StringBuilder sb = new StringBuilder("[");
            for (int i = 0; i < size; i++) {
                sb.append(data[i]).append(",");
            }
            sb.deleteCharAt(sb.lastIndexOf(",")).append("]");
            return sb.toString();
        }

    }


# 测试用例：

		import static org.assertj.core.api.Assertions.*;

		import org.junit.Test;

		public class ArrayList2Test {

			@Test
			public void test() {
				IList list = new ArrayList2(5);
				list.add("a");
				list.add("b");
				list.add("c");
				list.add("d");
				list.add("e");
				list.add("f");
				System.out.println(list);
				assertThat(list.size()).isEqualTo(6);
				assertThat(list.indexOf("e")).isEqualTo(4);
				assertThat(list.get(6)).isEqualTo(null);
				assertThat(list.get(5)).isEqualTo("f");
				assertThat(list.search("a")).isEqualTo("a");
				assertThat(list.isEmpty()).isFalse();
				list.remove("f");
				assertThat(list.size()).isEqualTo(5);
				assertThat(list.contains("f")).isFalse();
				assertThat(list.indexOf("f")).isEqualTo(-1);
				System.out.println(list);
				list.add("m", 0);
				System.out.println(list);
				assertThat(list.toString()).isEqualTo("[m,a,b,c,d,e]");
				list.delete(0);
				assertThat(list.toString()).isEqualTo("[a,b,c,d,e]");
				list.delete(10);
				list.delete(2);
				assertThat(list.toString()).isEqualTo("[a,b,d,e]");
				System.out.println(list);
			}

		}

