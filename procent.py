
input_value = int(input('Введите значение: '))
input_procent = int(input('Введите процент: '))


def solution(input_value, input_procent):
    desyatka_value = input_value/10
    edenica_value = input_value/100

    if input_procent <= 100:
        desytky_procent = input_procent // 10
        edinicy_procent = input_procent % 10

        desyatky = desyatka_value * desytky_procent
        edinicy =  edenica_value * edinicy_procent

        result = desyatky + edinicy
        return result
    else:
        print('Значение процента не может быть больше 100')
        return 0



print(solution(input_value,input_procent))




