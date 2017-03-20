---
layout: post
title: java实现链表
category: ref
tags: 进阶 数据结构与算法
keywords: 蓝桥 lanqiao 教程 数据结构 算法
description: 
author: 郑未
importance: 4
order: 1
---
# 链表实现：

	public class LinkedList implements IList {

		private Entry head;
		private Entry last;
		private int size = 0;// 元素个数

		@Override
		public void add(Object obj) {
			// 加第一个元素
			if (size == 0) {
				head = new Entry(obj, null, null);
				last = head;
			} else {
				Entry temp = new Entry(obj, last, null);
				last.next = temp;
				last = temp;
			}
			size++;
		}

		@Override
		public void add(Object obj, int index) {
			// i最多为size
			if (index > size) {
				throw new IndexOutOfBoundsException();
			}
			if (index == size) {
				add(obj);
			} else {
				Entry e = getEntry(index);
				Entry temp = new Entry(obj, null, null);
				if (e == head) {
					head.pre = temp;
					temp.next = head;
					head = temp;
				} else {
					// 交换指针
					e.pre.next = temp;
					temp.next = e;
					temp.pre = e.pre;
					e.pre = temp;
				}
				size++;
			}

		}

		@Override
		public void delete(int index) {
			Entry e = getEntry(index);
			removeEntry(e);
		}

		@Override
		public void remove(Object key) {
			Entry tmp = getEntry(key);
			removeEntry(tmp);
		}

		private void removeEntry(Entry e) {
			// 考虑最后一个元素
			if (last == e) {
				e.pre.next = null;
				last = e.pre;
				size--;
				return;
			}
			if (head == e) {
				head.next.pre = null;
				head = head.next;
				size--;
				return;
			}

			if (null != e) {
				e.pre.next = e.next;
				e.next.pre = e.pre;
				size--;
			}
		}

		@Override
		public Object get(int index) {
			if (index >= size)
				return null;
			return getEntry(index).value;
		}

		@Override
		public Object search(Object key) {
			Entry tmp = getEntry(key);
			if (null == tmp)
				return null;
			else
				return tmp.value;
		}

		@Override
		public boolean contains(Object key) {
			return search(key) != null;
		}

		/**
		 * 得到第i个与元素
		 * 
		 * @param index
		 * @return
		 */
		private Entry getEntry(int index) {
			if (index >= size) {
				return null;
			}
			// 找到i指向的那个元素
			Entry e = head;
			int j = 0;
			while (j < index) {
				e = e.next;
				j++;
			}
			return e;
		}

		private Entry getEntry(Object key) {
			Entry tmp = head;
			while (tmp != null) {
				if ((tmp.value == null && key == null) || tmp.value.equals(key)) {
					return tmp;
				} else {
					tmp = tmp.next;
				}
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
		public int indexOf(Object e) {
			int index = 0;
			Entry tmp = head;
			while (tmp != null) {
				if ((tmp.value == null && e == null) || tmp.value.equals(e)) {// 命中
					return index;
				} else {
					tmp = tmp.next;
					index++;
				}
			}
			return -1;
		}

		class Entry {
			Object value;
			Entry pre;
			Entry next;

			public Entry(Object value, Entry pre, Entry next) {
				super();
				this.value = value;
				this.pre = pre;
				this.next = next;
			}

			@Override
			public String toString() {
				return value.toString();
			}

			@Override
			public int hashCode() {
				final int prime = 31;
				int result = 1;
				result = prime * result + getOuterType().hashCode();
				result = prime * result + ((value == null) ? 0 : value.hashCode());
				return result;
			}

			@Override
			public boolean equals(Object obj) {
				if (this == obj)
					return true;
				if (obj == null)
					return false;
				if (getClass() != obj.getClass())
					return false;
				Entry other = (Entry) obj;
				if (!getOuterType().equals(other.getOuterType()))
					return false;
				if (value == null) {
					if (other.value != null)
						return false;
				} else if (!value.equals(other.value))
					return false;
				return true;
			}

			private LinkedList getOuterType() {
				return LinkedList.this;
			}

		}

		@Override
		public String toString() {
			Entry e = head;
			StringBuilder sb = new StringBuilder("[");
			while (e != null) {
				sb.append(e.value.toString()).append(",");
				e = e.next;
			}
			sb.deleteCharAt(sb.lastIndexOf(",")).append("]");
			return sb.toString();
		}
	}

# 测试用例：

	import static org.assertj.core.api.Assertions.*;

	import org.junit.Test;

	public class LinkedListTest {

		@Test
		public void test() {
			IList list = new LinkedList();
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

