<template>
  <div class="w-full sm:w-1/2 lg:w-1/3 mx-auto">
    <div class="flex items-center justify-between mb-8">
      <div class="text-gray-500 font-medium">Controle financeiro</div>
    </div>

    <!-- Todo form -->
    <form
      class="flex items-center px-4 bg-gray-900 h-15 rounded-lg mb-3"
      @submit.stop.prevent="createTransaction()"
    >
      <input
        v-model="newTransaction"
        placeholder="Digite o nome da sua lista ..."
        type="text"
        class="bg-gray-900 placeholder-gray-700 text-slate-50 focus:outline-none block w-full appearance-none leading-normal pr-3 font-medium"
      />

      <button
        type="submit"
        class="text-slate-50 text-xs font-semibold focus:outline-none"
      >
        ADICIONAR
      </button>
    </form>
    <!--/ Todo form -->

    <div v-if="this.spinner.get_transactions" class="text-center">
      <Spinner />
    </div>

    <div>
      <!-- Todo card show -->
      <TransactionCard
        v-for="transaction in transactions"
        :key="transaction.id"
        :transaction="transaction"
        @afterDeleting="afterDeleting(transaction)"
      />
    </div>
  </div>
</template>

<script>
import Spinner from "@/components/utils/Spinner.vue";
import TransactionCard from "@/components/Finance/TransactionCard.vue";

export default {
  name: "Finances",
  components: {
    Spinner,
    TransactionCard,
  },
  data() {
    return {
      spinner: {
        get_transactions: false,
      },
      transactions: [],
      newTransaction: "",
    };
  },

  created() {
    this.getTransactions();
  },
  methods: {
    setGetTransactionsSpinner(flag) {
      this.get_transactions = flag;
    },
    createTransaction() {},

    getTransactions() {
      this.setGetTransactionsSpinner(true);
      this.$axios.get("/v1/finance/transactions").then((response) => {
        this.transactions = response.data.data.map((transaction) => ({
          ...transaction,
          state: "show",
        }));
      });
      this.setGetTransactionsSpinner(false);
    },
    afterDeleting(transaction) {},
  },
};
</script>

<style>
</style>