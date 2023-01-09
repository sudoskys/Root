# -*- coding: utf-8 -*-
# @Time    : 1/9/23 2:16 PM
# @FileName: Check.py
# @Software: PyCharm
# @Github    ：sudoskys

import os
import re

import autocorrect_py as autocorrect

from loguru import logger

item_list = []
DOCS_PATH = './docs'
logger.add(sink='run.log',
           format="{time} - {level} - {message}",
           level="INFO",
           rotation="500 MB",
           enqueue=True)


def remove_markdown_symbol(string):
    # 创建要去除的符号列表
    symbol_list = ['#', '-', '*', '+', '[', ']', '\\', '(', ')', '_', '`', ':', ';', '&', '!', '>', '$', '~']
    # 遍历字符串中的每一个字符
    for char in string:
        # 如果字符是要去除的符号
        if char in symbol_list:
            # 用空格替换此字符
            string = string.replace(char, ' ')
    return string


def has_chinese_and_english(content):
    regex_chinese = re.compile(u'[\u4e00-\u9fa5]')
    regex_english = re.compile('[A-Za-z]')
    # 遍历传入内容，判断字符是不是中文或英文
    for char in content:
        # 如果为中文
        if regex_chinese.match(str(char)):
            return True
        # 如果为英文
        if regex_english.match(str(char)):
            return True
    return False


# 递归遍历指定目录
def search_files(directory_path: str):
    # 遍历文件夹
    for file in os.listdir(directory_path):
        file_or_dir_path = os.path.join(directory_path, file)
        if os.path.isfile(file_or_dir_path):
            if file.endswith('.md'):
                with open(os.path.join(directory_path, file), 'r') as f:
                    lines = f.readlines()
                for index in range(len(lines)):
                    if has_chinese_and_english(lines[index]):
                        item_list.append({'path': file, "lines": index, 'content': lines[index]})
        elif os.path.isdir(file_or_dir_path):
            # 如果是文件夹，递归调用本函数
            search_files(file_or_dir_path)


# 递归遍历文件夹
search_files(DOCS_PATH)
for item in item_list:
    local = item["path"]
    lines = item["lines"]
    line = item["content"]
    # line = remove_markdown_symbol(line)
    # line = line.strip()
    err = False
    corrected_sent = autocorrect.format(line)
    if corrected_sent != line:
        err = True
    pur = f"{local} -{lines}"
    if err:
        logger.warning(f"{pur}->{line}")
        logger.success(f"{pur}->{corrected_sent}")
        # print("{} query:{} => {}, err:{}".format(pur, line, correct_sent, err))
